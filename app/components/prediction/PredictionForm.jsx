'use client';

import { useState } from 'react';
import axios from 'axios';

export function PredictionForm() {

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({

    // Visible fields
    district: 'Mumbai',

    current_cases: 120,

    lag_1: 80,
    lag_2: 50,
    lag_3: 30,

    rainfall_mm_week: 260,
    humidity_pct: 91,

    temperature_max_c: 36,
    temperature_min_c: 28,

    // Hidden/default fields
    week: 32,

    air_quality_index: 180,

    population_density_per_km2: 1200,
    urban_index_0to1: 0.95,
    mobility_index_0to100: 88,

    vaccination_coverage_pct: 42,
    sanitation_score_0to100: 28,
    healthcare_index_0to100: 45,

    hospital_readiness: 0,

    mosquito_density_index_0to10: 10,
    larval_survey_index_0to10: 10,
    waterlogging_index_0to10: 9,
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        'http://127.0.0.1:8000/predict',
        formData
      );

      setResult(response.data);

    } catch (error) {

      console.error(error);

      alert('Prediction failed');

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-black/40 border border-cyan-500/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >

        {/* District */}

        <div className="flex flex-col gap-2">
          <label className="text-sm text-cyan-300">
            District
          </label>

          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition"
          />
        </div>

        {/* Current Cases */}

        <div className="flex flex-col gap-2">
          <label className="text-sm text-cyan-300">
            Current Cases
          </label>

          <input
            type="number"
            name="current_cases"
            value={formData.current_cases}
            onChange={handleChange}
            className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition"
          />
        </div>

        {/* Previous Week Cases */}

        <div className="flex flex-col gap-2">
          <label className="text-sm text-cyan-300">
            Previous Week Cases
          </label>

          <input
            type="number"
            name="lag_1"
            value={formData.lag_1}
            onChange={handleChange}
            className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition"
          />
        </div>

        {/* Rainfall */}

        <div className="flex flex-col gap-2">
          <label className="text-sm text-cyan-300">
            Rainfall (mm)
          </label>

          <input
            type="number"
            name="rainfall_mm_week"
            value={formData.rainfall_mm_week}
            onChange={handleChange}
            className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition"
          />
        </div>

        {/* Humidity */}

        <div className="flex flex-col gap-2">
          <label className="text-sm text-cyan-300">
            Humidity %
          </label>

          <input
            type="number"
            name="humidity_pct"
            value={formData.humidity_pct}
            onChange={handleChange}
            className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition"
          />
        </div>

        {/* Temperature */}

        <div className="flex flex-col gap-2">
          <label className="text-sm text-cyan-300">
            Temperature Max (°C)
          </label>

          <input
            type="number"
            name="temperature_max_c"
            value={formData.temperature_max_c}
            onChange={handleChange}
            className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition"
          />
        </div>

        {/* Submit Button */}

        <button
          type="submit"
          className="col-span-full mt-4 bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 rounded-2xl py-4 text-black font-bold text-lg shadow-lg hover:shadow-cyan-500/30"
        >

          {loading ? 'Predicting...' : 'Predict Risk'}

        </button>

      </form>

      {/* Result Card */}

      {result && (

        <div className="mt-8 rounded-3xl border border-cyan-500/20 bg-black/30 p-6 backdrop-blur-xl">

          <h2 className="text-2xl font-bold text-white mb-6">
            AI Prediction Result
          </h2>

          <div className="space-y-4">

            <div className="flex items-center justify-between">
              <span className="text-gray-300">
                Risk Probability
              </span>

              <span className="text-cyan-400 text-xl font-bold">
                {result.risk_probability}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-300">
                Risk Level
              </span>

              <span
                className={`text-xl font-bold ${
                  result.risk_level === 'HIGH'
                    ? 'text-red-400'
                    : 'text-green-400'
                }`}
              >
                {result.risk_level}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-300">
                District Recognized
              </span>

              <span className="text-green-400 font-semibold">
                {String(result.district_known)}
              </span>
            </div>

          </div>

        </div>

      )}

    </div>

  );

}