'use client';

import { useState } from 'react';
import axios from 'axios';
import { GlassPanel } from '@/components/base/GlassPanel';
import { RiskResultCard } from './RiskResultCard';
import { Loader2 } from 'lucide-react';


const districts = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Surat', 'Indore', 'Cochin', 'Nagpur', 'Chandigarh'
];

const formSections = [
  {
    title: 'District Information',
    fields: [
      { name: 'district', label: 'District', type: 'select', options: districts, required: true },
    ]
  },
  {
    title: 'Case History (Lag)',
    fields: [
      { name: 'cases_lag1', label: 'Cases (Lag 1 week)', type: 'number', required: true },
      { name: 'cases_lag2', label: 'Cases (Lag 2 weeks)', type: 'number', required: true },
      { name: 'cases_lag3', label: 'Cases (Lag 3 weeks)', type: 'number', required: true },
    ]
  },
  {
    title: 'Environmental Factors',
    fields: [
      { name: 'rainfall', label: 'Rainfall (mm)', type: 'number', required: true },
      { name: 'humidity', label: 'Humidity (%)', type: 'number', required: true },
      { name: 'temperature', label: 'Temperature (°C)', type: 'number', required: true },
    ]
  },
  {
    title: 'Air Quality',
    fields: [
      { name: 'aqi', label: 'Air Quality Index', type: 'number', required: true },
    ]
  },
  {
    title: 'Population & Demographics',
    fields: [
      { name: 'population', label: 'Population (thousands)', type: 'number', required: true },
      { name: 'population_density', label: 'Population Density (per sq.km)', type: 'number', required: true },
    ]
  },
  {
    title: 'Vaccination & Health',
    fields: [
      { name: 'vaccination_rate', label: 'Vaccination Rate (%)', type: 'number', required: true },
      { name: 'sanitation', label: 'Sanitation Index (0-100)', type: 'number', required: true },
    ]
  },
  {
    title: 'Healthcare Infrastructure',
    fields: [
      { name: 'healthcare_capacity', label: 'Healthcare Capacity (%)', type: 'number', required: true },
      { name: 'doctor_patient_ratio', label: 'Doctor to Patient Ratio', type: 'number', required: true },
    ]
  },
  {
    title: 'Vector Control',
    fields: [
      { name: 'vector_control', label: 'Vector Control Index (0-100)', type: 'number', required: true },
    ]
  },
  {
    title: 'Water Quality',
    fields: [
      { name: 'water_quality', label: 'Water Quality Index (0-100)', type: 'number', required: true },
    ]
  },
];

export function PredictionForm() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'district' ? value : parseFloat(value) || 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        district: formData.district,

        current_cases: formData.cases_lag1,
        lag_1: formData.cases_lag1,
        lag_2: formData.cases_lag2,
        lag_3: formData.cases_lag3,

        week: formData.week ?? 0,

        rainfall_mm_week: formData.rainfall,
        humidity_pct: formData.humidity,
        temperature_max_c: formData.temperature,
        temperature_min_c: formData.temperature,

        air_quality_index: formData.aqi,
        population_density_per_km2: formData.population_density,
        urban_index_0to1: formData.urban_index_0to1 ?? 0.5,
        mobility_index_0to100: formData.mobility_index_0to100 ?? 50,

        vaccination_coverage_pct: formData.vaccination_rate,
        sanitation_score_0to100: formData.sanitation,
        healthcare_index_0to100: formData.healthcare_capacity,
        hospital_readiness: formData.doctor_patient_ratio,

        mosquito_density_index_0to10: formData.vector_control,
        larval_survey_index_0to10: formData.larval_survey_index_0to10 ?? 5,
        waterlogging_index_0to10: formData.water_quality,
      };

      const response = await axios.post(
        'http://127.0.0.1:8000/predict',
        payload
      );

      setResult({
        ...response.data,
        percentage: Number((response.data.risk_probability * 100).toFixed(2)),
        // keep backward compatibility for RiskResultCard (expects `probability`)
        probability: Number((response.data.risk_probability * 100).toFixed(2)),
      });
    } catch (err) {
      console.error(err);
      setError('Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = Object.keys(formData).length > 0 && formData.district;

  return (
    <div className="space-y-8">
      <GlassPanel variant="ai" className="p-8 animate-slide-up-fade">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Form Sections */}
          {formSections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-cyan-400">{section.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{section.fields.length} fields</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      {field.label}
                    </label>
                    {field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-foreground focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-200"
                      >
                        <option value="">Select {field.label}</option>
                        {field.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        step="any"
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-foreground focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-200"
                        placeholder="Enter value"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Sample Data Button */}
          <button
            type="button"
            onClick={() => {
              const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
              const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
              const randFloat = (min, max, decimals = 2) => {
                const v = Math.random() * (max - min) + min;
                const factor = Math.pow(10, decimals);
                return Math.round(v * factor) / factor;
              };

              const districtChoice = pick(['Indore', 'Bhopal', 'Mumbai', 'Pune', 'Nagpur', 'Delhi']);

              // Keep lags realistically below current cases
              const current_cases = randInt(5, 160);
              const lag_1 = randInt(5, Math.max(5, Math.min(150, current_cases - 1)));
              const lag_2 = randInt(5, Math.max(5, Math.min(140, lag_1 - 1)));
              const lag_3 = randInt(5, Math.max(5, Math.min(130, lag_2 - 1)));

              setFormData({
                district: districtChoice,
                cases_lag1: current_cases,
                cases_lag2: lag_1,
                cases_lag3: lag_2,
                week: randInt(1, 52),

                rainfall: randInt(0, 180),
                humidity: randInt(35, 95),
                temperature: randFloat(28, 42, 1),

                aqi: randInt(40, 220),
                population_density: randInt(1000, 15000),

                urban_index_0to1: randFloat(0.2, 0.95, 2),
                mobility_index_0to100: randInt(20, 95),

                vaccination_rate: randInt(50, 98),
                sanitation: randInt(35, 95),
                healthcare_capacity: randInt(35, 95),
                doctor_patient_ratio: randFloat(0.5, 3, 1),

                vector_control: randInt(0, 10),
                larval_survey_index_0to10: randInt(0, 10),
                water_quality: randInt(0, 10),
              });
            }}
            className="w-full py-3 rounded-lg bg-white/10 border border-white/15 text-foreground font-semibold hover:bg-white/15 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Random Sample Data
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Predicting...
              </>
            ) : (
              'Predict Risk'
            )}
          </button>

          {error && (
            <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}
        </form>
      </GlassPanel>

      {/* Result Card */}
      {result && <RiskResultCard result={result} />}
    </div>
  );
}
