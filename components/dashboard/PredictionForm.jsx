'use client';

import { useState, useEffect } from 'react';
import { Zap, Loader2 } from 'lucide-react';
import axios from 'axios';

export function PredictionForm({ onPredictionResult }) {
  const [loading, setLoading] = useState(false);
  const [predicting, setPredicting] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  
  const [formData, setFormData] = useState({
    // Case history
    currentCases: 150,
    lag1: 140,
    lag2: 130,
    lag3: 125,
    // Environment
    rainfall: 45.5,
    humidity: 72,
    temperature: 28.5,
    // Population
    density: 450,
    // Healthcare
    vaccinationRate: 65,
    sanitationRate: 58,
  });

  // Load districts on mount
  useEffect(() => {
    const loadDistricts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/model-info');
        if (response.data && response.data.districts) {
          setDistricts(response.data.districts);
          if (response.data.districts.length > 0) {
            setSelectedDistrict(response.data.districts[0]);
          }
        }
      } catch (error) {
        console.error('Error loading districts:', error);
        // Fallback districts
        setDistricts(['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain']);
        setSelectedDistrict('Indore');
      } finally {
        setLoading(false);
      }
    };

    loadDistricts();
  }, []);

  const generateSampleData = () => {
    setFormData({
      currentCases: Math.floor(Math.random() * 300) + 50,
      lag1: Math.floor(Math.random() * 280) + 40,
      lag2: Math.floor(Math.random() * 260) + 30,
      lag3: Math.floor(Math.random() * 240) + 20,
      rainfall: Math.random() * 100 + 20,
      humidity: Math.random() * 40 + 50,
      temperature: Math.random() * 8 + 24,
      density: Math.floor(Math.random() * 600) + 200,
      vaccinationRate: Math.random() * 30 + 40,
      sanitationRate: Math.random() * 30 + 40,
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handlePredict = async () => {
    if (!selectedDistrict) return;

    try {
      setPredicting(true);
      const payload = {
        district: selectedDistrict,
        current_cases: formData.currentCases,
        lag_1: formData.lag1,
        lag_2: formData.lag2,
        lag_3: formData.lag3,
        rainfall: formData.rainfall,
        humidity: formData.humidity,
        temperature: formData.temperature,
        population_density: formData.density,
        vaccination_rate: formData.vaccinationRate,
        sanitation_rate: formData.sanitationRate,
      };

      const response = await axios.post('http://127.0.0.1:8000/predict', payload);
      onPredictionResult(response.data);
    } catch (error) {
      console.error('Error making prediction:', error);
      // Show error toast or UI
    } finally {
      setPredicting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Risk Prediction</h2>
        <p className="text-muted-foreground">Enter district data to predict outbreak risk</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Card */}
        <div className="lg:col-span-2">
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-8 overflow-hidden hover:border-white/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-transparent group-hover:from-cyan-500/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              {/* District Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  District
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-foreground focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? (
                    <option>Loading districts...</option>
                  ) : (
                    districts.map(district => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Case History Section */}
              <div className="space-y-3 pt-6 border-t border-white/5">
                <h4 className="text-sm font-semibold text-cyan-400">Case History</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Current Cases', field: 'currentCases' },
                    { label: 'Lag 1 Week', field: 'lag1' },
                    { label: 'Lag 2 Weeks', field: 'lag2' },
                    { label: 'Lag 3 Weeks', field: 'lag3' },
                  ].map(({ label, field }) => (
                    <div key={field} className="space-y-1">
                      <label className="text-xs text-muted-foreground">{label}</label>
                      <input
                        type="number"
                        value={formData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-foreground text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-200"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Environment Section */}
              <div className="space-y-3 pt-6 border-t border-white/5">
                <h4 className="text-sm font-semibold text-blue-400">Environment</h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Rainfall (mm)', field: 'rainfall' },
                    { label: 'Humidity (%)', field: 'humidity' },
                    { label: 'Temp (°C)', field: 'temperature' },
                  ].map(({ label, field }) => (
                    <div key={field} className="space-y-1">
                      <label className="text-xs text-muted-foreground">{label}</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-foreground text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-200"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Population & Healthcare Section */}
              <div className="space-y-3 pt-6 border-t border-white/5">
                <h4 className="text-sm font-semibold text-green-400">Population & Healthcare</h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Population Density', field: 'density' },
                    { label: 'Vaccination Rate (%)', field: 'vaccinationRate' },
                    { label: 'Sanitation Rate (%)', field: 'sanitationRate' },
                  ].map(({ label, field }) => (
                    <div key={field} className="space-y-1">
                      <label className="text-xs text-muted-foreground">{label}</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-foreground text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons Panel */}
        <div className="space-y-4">
          <button
            onClick={handlePredict}
            disabled={predicting || !selectedDistrict}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {predicting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Predicting...
              </>
            ) : (
              <>
                <Zap size={18} />
                Predict Risk
              </>
            )}
          </button>

          <button
            onClick={generateSampleData}
            disabled={loading || predicting}
            className="w-full px-6 py-3 rounded-lg border border-cyan-500/50 text-cyan-400 font-semibold hover:bg-cyan-500/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Use Sample Data
          </button>
        </div>
      </div>
    </div>
  );
}
