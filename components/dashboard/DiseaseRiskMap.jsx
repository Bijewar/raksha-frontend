'use client';

import { useState } from 'react';
import { GlassPanel } from '@/components/base/GlassPanel';

// Disease risk data by state name
const stateRiskData = {
  'Delhi': { risk: 92, cases: 3245, trend: 8.5, disease: 'Dengue' },
  'Maharashtra': { risk: 85, cases: 2891, trend: 7.8, disease: 'Dengue' },
  'Madhya Pradesh': { risk: 78, cases: 1956, trend: 6.2, disease: 'Malaria' },
  'Uttar Pradesh': { risk: 72, cases: 2103, trend: 5.9, disease: 'Dengue' },
  'Rajasthan': { risk: 68, cases: 1789, trend: 4.9, disease: 'Malaria' },
  'Gujarat': { risk: 65, cases: 1567, trend: 4.2, disease: 'Dengue' },
  'West Bengal': { risk: 62, cases: 1456, trend: 3.4, disease: 'Dengue' },
  'Punjab': { risk: 62, cases: 1123, trend: 3.5, disease: 'Dengue' },
  'Karnataka': { risk: 60, cases: 1234, trend: 3.2, disease: 'Malaria' },
  'Haryana': { risk: 58, cases: 789, trend: 2.8, disease: 'Dengue' },
  'Tamil Nadu': { risk: 55, cases: 1205, trend: 2.8, disease: 'Dengue' },
  'Bihar': { risk: 55, cases: 567, trend: 2.3, disease: 'Malaria' },
  'Jharkhand': { risk: 54, cases: 456, trend: 2.1, disease: 'Malaria' },
  'Chhattisgarh': { risk: 52, cases: 423, trend: 1.9, disease: 'Malaria' },
  'Chandigarh': { risk: 50, cases: 156, trend: 1.5, disease: 'Dengue' },
  'Odisha': { risk: 50, cases: 534, trend: 1.9, disease: 'Malaria' },
  'Assam': { risk: 48, cases: 289, trend: 1.8, disease: 'Dengue' },
  'Telangana': { risk: 48, cases: 612, trend: 1.8, disease: 'Dengue' },
  'Puducherry': { risk: 45, cases: 256, trend: 1.4, disease: 'Dengue' },
  'Andhra Pradesh': { risk: 42, cases: 234, trend: 1.2, disease: 'Dengue' },
  'Meghalaya': { risk: 42, cases: 178, trend: 1.1, disease: 'Dengue' },
  'Uttarakhand': { risk: 40, cases: 267, trend: 1.1, disease: 'Dengue' },
  'Goa': { risk: 38, cases: 134, trend: 0.9, disease: 'Dengue' },
  'Tripura': { risk: 38, cases: 145, trend: 0.8, disease: 'Dengue' },
  'Dadra and Nagar Haveli': { risk: 35, cases: 78, trend: 0.6, disease: 'Dengue' },
  'Manipur': { risk: 35, cases: 105, trend: 0.7, disease: 'Dengue' },
  'Himachal Pradesh': { risk: 32, cases: 89, trend: 0.6, disease: 'Dengue' },
  'Mizoram': { risk: 30, cases: 67, trend: 0.4, disease: 'Dengue' },
  'Andaman and Nicobar': { risk: 30, cases: 45, trend: 0.8, disease: 'Dengue' },
  'Kerala': { risk: 28, cases: 67, trend: 0.5, disease: 'Dengue' },
  'Nagaland': { risk: 28, cases: 45, trend: 0.3, disease: 'Dengue' },
  'Arunachal Pradesh': { risk: 25, cases: 12, trend: 0.3, disease: 'Dengue' },
  'Sikkim': { risk: 22, cases: 34, trend: 0.3, disease: 'Dengue' },
  'Ladakh': { risk: 20, cases: 23, trend: 0.2, disease: 'Dengue' },
  'Lakshadweep': { risk: 18, cases: 15, trend: 0.1, disease: 'Dengue' },
};

const getRiskColor = (risk) => {
  if (risk >= 80) return '#ef4444'; // Red - Critical
  if (risk >= 60) return '#f97316'; // Orange - High
  if (risk >= 40) return '#eab308'; // Yellow - Moderate
  return '#22c55e'; // Green - Low
};

const getRiskLabel = (risk) => {
  if (risk >= 80) return 'Critical';
  if (risk >= 60) return 'High';
  if (risk >= 40) return 'Moderate';
  return 'Low';
};

// Simplified state regions with realistic coordinates for choropleth
const INDIA_REGIONS = [
  { name: 'Delhi', risk: 92, cases: 3245, trend: 8.5, disease: 'Dengue', path: 'M 76.8 28.4 L 77.3 28.4 L 77.3 28.9 L 76.8 28.9 Z', cx: 77, cy: 28.65 },
  { name: 'Madhya Pradesh', risk: 78, cases: 1956, trend: 6.2, disease: 'Malaria', path: 'M 74.0 21.0 L 82.8 21.0 L 82.8 26.9 L 74.0 26.9 Z', cx: 78.4, cy: 23.95 },
  { name: 'Maharashtra', risk: 85, cases: 2891, trend: 7.8, disease: 'Dengue', path: 'M 72.6 15.6 L 80.9 15.6 L 80.9 22.0 L 72.6 22.0 Z', cx: 76.75, cy: 18.8 },
  { name: 'Uttar Pradesh', risk: 72, cases: 2103, trend: 5.9, disease: 'Dengue', path: 'M 77.0 23.8 L 84.3 23.8 L 84.3 30.4 L 77.0 30.4 Z', cx: 80.65, cy: 27.1 },
  { name: 'Rajasthan', risk: 68, cases: 1789, trend: 4.9, disease: 'Malaria', path: 'M 68.2 23.0 L 78.0 23.0 L 78.0 37.0 L 68.2 37.0 Z', cx: 73.1, cy: 30 },
  { name: 'Gujarat', risk: 65, cases: 1567, trend: 4.2, disease: 'Dengue', path: 'M 68.1 20.6 L 74.5 20.6 L 74.5 24.5 L 68.1 24.5 Z', cx: 71.3, cy: 22.55 },
  { name: 'West Bengal', risk: 62, cases: 1456, trend: 3.4, disease: 'Dengue', path: 'M 85.8 21.6 L 89.9 21.6 L 89.9 27.4 L 85.8 27.4 Z', cx: 87.85, cy: 24.5 },
  { name: 'Punjab', risk: 62, cases: 1123, trend: 3.5, disease: 'Dengue', path: 'M 73.6 29.5 L 76.6 29.5 L 76.6 32.3 L 73.6 32.3 Z', cx: 75.1, cy: 30.9 },
  { name: 'Karnataka', risk: 60, cases: 1234, trend: 3.2, disease: 'Malaria', path: 'M 74.0 11.5 L 78.6 11.5 L 78.6 18.5 L 74.0 18.5 Z', cx: 76.3, cy: 15 },
  { name: 'Haryana', risk: 58, cases: 789, trend: 2.8, disease: 'Dengue', path: 'M 76.5 27.0 L 78.0 27.0 L 78.0 30.6 L 76.5 30.6 Z', cx: 77.25, cy: 28.8 },
  { name: 'Tamil Nadu', risk: 55, cases: 1205, trend: 2.8, disease: 'Dengue', path: 'M 78.6 8.0 L 80.3 8.0 L 80.3 13.6 L 78.6 13.6 Z', cx: 79.45, cy: 10.8 },
  { name: 'Bihar', risk: 55, cases: 567, trend: 2.3, disease: 'Malaria', path: 'M 82.3 24.3 L 88.3 24.3 L 88.3 27.5 L 82.3 27.5 Z', cx: 85.3, cy: 25.9 },
  { name: 'Jharkhand', risk: 54, cases: 456, trend: 2.1, disease: 'Malaria', path: 'M 82.2 22.0 L 87.5 22.0 L 87.5 25.3 L 82.2 25.3 Z', cx: 84.85, cy: 23.65 },
  { name: 'Chhattisgarh', risk: 52, cases: 423, trend: 1.9, disease: 'Malaria', path: 'M 80.6 19.4 L 84.3 19.4 L 84.3 24.0 L 80.6 24.0 Z', cx: 82.45, cy: 21.7 },
  { name: 'Odisha', risk: 50, cases: 534, trend: 1.9, disease: 'Malaria', path: 'M 83.3 17.7 L 87.5 17.7 L 87.5 22.6 L 83.3 22.6 Z', cx: 85.4, cy: 20.15 },
  { name: 'Assam', risk: 48, cases: 289, trend: 1.8, disease: 'Dengue', path: 'M 88.0 24.0 L 97.4 24.0 L 97.4 28.3 L 88.0 28.3 Z', cx: 92.7, cy: 26.15 },
  { name: 'Telangana', risk: 48, cases: 612, trend: 1.8, disease: 'Dengue', path: 'M 77.3 15.8 L 81.9 15.8 L 81.9 19.9 L 77.3 19.9 Z', cx: 79.6, cy: 17.85 },
  { name: 'Andhra Pradesh', risk: 42, cases: 234, trend: 1.2, disease: 'Dengue', path: 'M 76.8 12.6 L 84.7 12.6 L 84.7 18.5 L 76.8 18.5 Z', cx: 80.75, cy: 15.55 },
  { name: 'Meghalaya', risk: 42, cases: 178, trend: 1.1, disease: 'Dengue', path: 'M 90.0 24.7 L 92.3 24.7 L 92.3 26.2 L 90.0 26.2 Z', cx: 91.15, cy: 25.45 },
  { name: 'Goa', risk: 38, cases: 134, trend: 0.9, disease: 'Dengue', path: 'M 73.7 14.8 L 74.3 14.8 L 74.3 15.9 L 73.7 15.9 Z', cx: 74, cy: 15.35 },
  { name: 'Kerala', risk: 28, cases: 67, trend: 0.5, disease: 'Dengue', path: 'M 76.2 8.3 L 77.6 8.3 L 77.6 12.8 L 76.2 12.8 Z', cx: 76.9, cy: 10.55 },
  { name: 'Himachal Pradesh', risk: 32, cases: 89, trend: 0.6, disease: 'Dengue', path: 'M 75.5 30.2 L 78.9 30.2 L 78.9 33.1 L 75.5 33.1 Z', cx: 77.2, cy: 31.65 },
  { name: 'Uttarakhand', risk: 40, cases: 267, trend: 1.1, disease: 'Dengue', path: 'M 77.6 28.8 L 81.0 28.8 L 81.0 31.5 L 77.6 31.5 Z', cx: 79.3, cy: 30.15 },
  { name: 'Tripura', risk: 38, cases: 145, trend: 0.8, disease: 'Dengue', path: 'M 91.2 22.6 L 92.2 22.6 L 92.2 23.9 L 91.2 23.9 Z', cx: 91.7, cy: 23.25 },
  { name: 'Manipur', risk: 35, cases: 105, trend: 0.7, disease: 'Dengue', path: 'M 93.0 23.8 L 94.8 23.8 L 94.8 25.2 L 93.0 25.2 Z', cx: 93.9, cy: 24.5 },
  { name: 'Mizoram', risk: 30, cases: 67, trend: 0.4, disease: 'Dengue', path: 'M 92.2 21.4 L 93.5 21.4 L 93.5 23.8 L 92.2 23.8 Z', cx: 92.85, cy: 22.6 },
  { name: 'Nagaland', risk: 28, cases: 45, trend: 0.3, disease: 'Dengue', path: 'M 93.3 25.1 L 94.9 25.1 L 94.9 27.0 L 93.3 27.0 Z', cx: 94.1, cy: 26.05 },
  { name: 'Arunachal Pradesh', risk: 25, cases: 12, trend: 0.3, disease: 'Dengue', path: 'M 91.5 26.6 L 97.4 26.6 L 97.4 29.0 L 91.5 29.0 Z', cx: 94.45, cy: 27.8 },
  { name: 'Sikkim', risk: 22, cases: 34, trend: 0.3, disease: 'Dengue', path: 'M 87.3 27.1 L 88.6 27.1 L 88.6 28.2 L 87.3 28.2 Z', cx: 87.95, cy: 27.65 },
  { name: 'Ladakh', risk: 20, cases: 23, trend: 0.2, disease: 'Dengue', path: 'M 75.6 32.6 L 79.6 32.6 L 79.6 35.4 L 75.6 35.4 Z', cx: 77.6, cy: 34 },
];

export function DiseaseRiskMap() {
  const [selectedState, setSelectedState] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">Disease Risk Heatmap</h2>
        <p className="text-gray-400">Geographic visualization of disease risk intensity across Indian states</p>
      </div>

      <GlassPanel>
        <div className="space-y-6">
          {/* Choropleth Map Container */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg overflow-hidden border border-cyan-400/20 p-2">
            <svg
              viewBox="60 7 50 30"
              className="w-full"
              preserveAspectRatio="xMidYMid meet"
              style={{ minHeight: '400px' }}
            >
              {/* Background */}
              <defs>
                <filter id="glow-effect">
                  <feGaussianBlur stdDeviation="0.3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              <rect x="60" y="7" width="50" height="30" fill="#0f172a" opacity="0.3" />

              {/* State regions - choropleth */}
              {INDIA_REGIONS.map((state) => {
                const fillColor = getRiskColor(state.risk);
                const isHovered = hoveredState?.name === state.name;
                const isSelected = selectedState?.name === state.name;

                return (
                  <g key={state.name}>
                    <path
                      d={state.path}
                      fill={fillColor}
                      stroke={isSelected ? '#00d9ff' : '#1e293b'}
                      strokeWidth={isSelected ? 0.08 : 0.03}
                      opacity={isHovered || isSelected ? 0.95 : 0.85}
                      className="cursor-pointer transition-all duration-200"
                      filter={isHovered || isSelected ? 'url(#glow-effect)' : 'none'}
                      onMouseEnter={() => setHoveredState(state)}
                      onMouseLeave={() => setHoveredState(null)}
                      onClick={() => setSelectedState(state)}
                    />
                    {/* State label */}
                    <text
                      x={state.cx}
                      y={state.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="pointer-events-none select-none"
                      fontSize="0.5"
                      fontWeight="600"
                      fill="#ffffff"
                      opacity={isHovered || isSelected ? 0.95 : 0.4}
                    >
                      {state.name.substring(0, 3)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500" />
              <span className="text-sm text-gray-300">Critical (80+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-orange-500" />
              <span className="text-sm text-gray-300">High (60-79)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-500" />
              <span className="text-sm text-gray-300">Moderate (40-59)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500" />
              <span className="text-sm text-gray-300">Low (0-39)</span>
            </div>
          </div>

          {/* Hovered State Tooltip */}
          {hoveredState && !selectedState && (
            <div className="bg-gradient-to-r from-cyan-400/10 to-blue-400/10 border border-cyan-400/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-cyan-300 mb-3">{hoveredState.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Disease</p>
                  <p className="text-lg font-semibold text-blue-400">{hoveredState.disease}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Risk Level</p>
                  <p className="text-xl font-bold" style={{ color: getRiskColor(hoveredState.risk) }}>{hoveredState.risk}%</p>
                  <p className="text-xs text-gray-500">{getRiskLabel(hoveredState.risk)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Active Cases</p>
                  <p className="text-xl font-bold text-orange-400">{hoveredState.cases}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Trend</p>
                  <p className="text-xl font-bold text-yellow-400">+{hoveredState.trend.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          )}

          {/* Selected State Details */}
          {selectedState && (
            <div className="bg-gradient-to-r from-cyan-400/10 to-blue-400/10 border border-cyan-400/30 rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-300">{selectedState.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">Click on another state to switch selection</p>
                </div>
                <button
                  onClick={() => setSelectedState(null)}
                  className="text-gray-400 hover:text-cyan-300 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-400 text-sm uppercase text-xs">Disease</p>
                  <p className="text-lg font-semibold text-blue-400 mt-1">{selectedState.disease}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm uppercase text-xs">Risk Level</p>
                  <div className="mt-1 flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getRiskColor(selectedState.risk) }}
                    />
                    <p className="text-lg font-bold" style={{ color: getRiskColor(selectedState.risk) }}>
                      {selectedState.risk}%
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{getRiskLabel(selectedState.risk)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm uppercase text-xs">Active Cases</p>
                  <p className="text-lg font-bold text-orange-400 mt-1">{selectedState.cases}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm uppercase text-xs">Trend</p>
                  <p className="text-lg font-bold text-yellow-400 mt-1">+{selectedState.trend.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          )}

          {/* Risk Distribution Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-red-400/10 to-red-600/10 border border-red-400/30 rounded-lg p-4">
              <p className="text-red-400 text-sm font-medium">Critical Zones</p>
              <p className="text-2xl font-bold text-red-300 mt-1">2</p>
            </div>
            <div className="bg-gradient-to-br from-orange-400/10 to-orange-600/10 border border-orange-400/30 rounded-lg p-4">
              <p className="text-orange-400 text-sm font-medium">High Risk</p>
              <p className="text-2xl font-bold text-orange-300 mt-1">6</p>
            </div>
            <div className="bg-gradient-to-br from-green-400/10 to-green-600/10 border border-green-400/30 rounded-lg p-4">
              <p className="text-green-400 text-sm font-medium">Under Control</p>
              <p className="text-2xl font-bold text-green-300 mt-1">26</p>
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
