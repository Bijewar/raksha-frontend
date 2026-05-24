'use client';

import { useState } from 'react';
import { GlassPanel } from '@/components/base/GlassPanel';

// Disease risk data by state name
const stateRiskData = {
  'Andaman and Nicobar': { risk: 30, cases: 45, trend: 0.8 },
  'Andhra Pradesh': { risk: 42, cases: 234, trend: 1.2 },
  'Arunachal Pradesh': { risk: 25, cases: 12, trend: 0.3 },
  'Assam': { risk: 48, cases: 289, trend: 1.8 },
  'Bihar': { risk: 55, cases: 567, trend: 2.3 },
  'Chandigarh': { risk: 50, cases: 156, trend: 1.5 },
  'Chhattisgarh': { risk: 52, cases: 423, trend: 1.9 },
  'Dadra and Nagar Haveli and Daman and Diu': { risk: 35, cases: 78, trend: 0.6 },
  'Delhi': { risk: 92, cases: 3245, trend: 8.5 },
  'Goa': { risk: 38, cases: 134, trend: 0.9 },
  'Gujarat': { risk: 65, cases: 1567, trend: 4.2 },
  'Haryana': { risk: 58, cases: 789, trend: 2.8 },
  'Himachal Pradesh': { risk: 32, cases: 89, trend: 0.6 },
  'Jharkhand': { risk: 54, cases: 456, trend: 2.1 },
  'Karnataka': { risk: 60, cases: 1234, trend: 3.2 },
  'Kerala': { risk: 28, cases: 67, trend: 0.5 },
  'Ladakh': { risk: 20, cases: 23, trend: 0.2 },
  'Lakshadweep': { risk: 18, cases: 15, trend: 0.1 },
  'Madhya Pradesh': { risk: 78, cases: 1956, trend: 6.2 },
  'Maharashtra': { risk: 85, cases: 2891, trend: 7.8 },
  'Manipur': { risk: 35, cases: 105, trend: 0.7 },
  'Meghalaya': { risk: 42, cases: 178, trend: 1.1 },
  'Mizoram': { risk: 30, cases: 67, trend: 0.4 },
  'Nagaland': { risk: 28, cases: 45, trend: 0.3 },
  'Odisha': { risk: 50, cases: 534, trend: 1.9 },
  'Puducherry': { risk: 45, cases: 256, trend: 1.4 },
  'Punjab': { risk: 62, cases: 1123, trend: 3.5 },
  'Rajasthan': { risk: 68, cases: 1789, trend: 4.9 },
  'Sikkim': { risk: 22, cases: 34, trend: 0.3 },
  'Tamil Nadu': { risk: 55, cases: 1205, trend: 2.8 },
  'Telangana': { risk: 48, cases: 612, trend: 1.8 },
  'Tripura': { risk: 38, cases: 145, trend: 0.8 },
  'Uttar Pradesh': { risk: 72, cases: 2103, trend: 5.9 },
  'Uttarakhand': { risk: 40, cases: 267, trend: 1.1 },
  'West Bengal': { risk: 62, cases: 1456, trend: 3.4 },
};

const getRiskColor = (risk) => {
  if (risk >= 80) return { color: '#ef4444', label: 'Critical' };
  if (risk >= 60) return { color: '#f97316', label: 'High' };
  if (risk >= 40) return { color: '#eab308', label: 'Moderate' };
  return { color: '#22c55e', label: 'Low' };
};

// Simplified India state shapes with risk levels
const INDIA_STATES = [
  { id: 'delhi', name: 'Delhi', risk: 92, cases: 3245, trend: 8.5, x: 65, y: 25, width: 3, height: 2.5 },
  { id: 'maharashtra', name: 'Maharashtra', risk: 85, cases: 2891, trend: 7.8, x: 20, y: 45, width: 12, height: 14 },
  { id: 'madhya_pradesh', name: 'Madhya Pradesh', risk: 78, cases: 1956, trend: 6.2, x: 42, y: 35, width: 14, height: 12 },
  { id: 'uttar_pradesh', name: 'Uttar Pradesh', risk: 72, cases: 2103, trend: 5.9, x: 50, y: 22, width: 18, height: 12 },
  { id: 'rajasthan', name: 'Rajasthan', risk: 68, cases: 1789, trend: 4.9, x: 28, y: 18, width: 16, height: 18 },
  { id: 'gujarati', name: 'Gujarat', risk: 65, cases: 1567, trend: 4.2, x: 12, y: 28, width: 12, height: 16 },
  { id: 'west_bengal', name: 'West Bengal', risk: 62, cases: 1456, trend: 3.4, x: 75, y: 32, width: 10, height: 10 },
  { id: 'punjab', name: 'Punjab', risk: 62, cases: 1123, trend: 3.5, x: 42, y: 10, width: 8, height: 6 },
  { id: 'karnataka', name: 'Karnataka', risk: 60, cases: 1234, trend: 3.2, x: 28, y: 55, width: 12, height: 12 },
  { id: 'haryana', name: 'Haryana', risk: 58, cases: 789, trend: 2.8, x: 53, y: 20, width: 6, height: 5 },
  { id: 'tamil_nadu', name: 'Tamil Nadu', risk: 55, cases: 1205, trend: 2.8, x: 42, y: 72, width: 12, height: 10 },
  { id: 'bihar', name: 'Bihar', risk: 55, cases: 567, trend: 2.3, x: 62, y: 28, width: 8, height: 8 },
  { id: 'odisha', name: 'Odisha', risk: 50, cases: 534, trend: 1.9, x: 70, y: 42, width: 10, height: 10 },
  { id: 'chandigarh', name: 'Chandigarh', risk: 50, cases: 156, trend: 1.5, x: 48, y: 18, width: 2, height: 2 },
  { id: 'assam', name: 'Assam', risk: 48, cases: 289, trend: 1.8, x: 82, y: 18, width: 10, height: 8 },
  { id: 'telangana', name: 'Telangana', risk: 48, cases: 612, trend: 1.8, x: 40, y: 50, width: 10, height: 10 },
  { id: 'puducherry', name: 'Puducherry', risk: 45, cases: 256, trend: 1.4, x: 45, y: 75, width: 2, height: 2 },
  { id: 'meghalaya', name: 'Meghalaya', risk: 42, cases: 178, trend: 1.1, x: 80, y: 25, width: 4, height: 4 },
  { id: 'andhra_pradesh', name: 'Andhra Pradesh', risk: 42, cases: 234, trend: 1.2, x: 40, y: 60, width: 12, height: 12 },
  { id: 'uttarakhand', name: 'Uttarakhand', risk: 40, cases: 267, trend: 1.1, x: 57, y: 15, width: 6, height: 6 },
  { id: 'goa', name: 'Goa', risk: 38, cases: 134, trend: 0.9, x: 18, y: 55, width: 3, height: 3 },
  { id: 'tripura', name: 'Tripura', risk: 38, cases: 145, trend: 0.8, x: 88, y: 32, width: 3, height: 3 },
  { id: 'dadra_nagar_haveli', name: 'Dadra & Nagar Haveli', risk: 35, cases: 78, trend: 0.6, x: 16, y: 38, width: 3, height: 3 },
  { id: 'manipur', name: 'Manipur', risk: 35, cases: 105, trend: 0.7, x: 90, y: 28, width: 3, height: 3 },
  { id: 'himachal_pradesh', name: 'Himachal Pradesh', risk: 32, cases: 89, trend: 0.6, x: 52, y: 10, width: 8, height: 6 },
  { id: 'andaman_nicobar', name: 'Andaman & Nicobar', risk: 30, cases: 45, trend: 0.8, x: 72, y: 82, width: 2, height: 2 },
  { id: 'mizoram', name: 'Mizoram', risk: 30, cases: 67, trend: 0.4, x: 92, y: 42, width: 3, height: 3 },
  { id: 'kerala', name: 'Kerala', risk: 28, cases: 67, trend: 0.5, x: 32, y: 75, width: 6, height: 10 },
  { id: 'nagaland', name: 'Nagaland', risk: 28, cases: 45, trend: 0.3, x: 88, y: 24, width: 3, height: 3 },
  { id: 'jharkhand', name: 'Jharkhand', risk: 54, cases: 456, trend: 2.1, x: 68, y: 36, width: 8, height: 8 },
  { id: 'chhattisgarh', name: 'Chhattisgarh', risk: 52, cases: 423, trend: 1.9, x: 58, y: 42, width: 10, height: 10 },
  { id: 'arunachal_pradesh', name: 'Arunachal Pradesh', risk: 25, cases: 12, trend: 0.3, x: 85, y: 12, width: 8, height: 8 },
  { id: 'sikkim', name: 'Sikkim', risk: 22, cases: 34, trend: 0.3, x: 80, y: 16, width: 2, height: 2 },
  { id: 'ladakh', name: 'Ladakh', risk: 20, cases: 23, trend: 0.2, x: 50, y: 5, width: 8, height: 6 },
  { id: 'lakshadweep', name: 'Lakshadweep', risk: 18, cases: 15, trend: 0.1, x: 8, y: 70, width: 1, height: 1 },
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
          {/* Map Container - SVG based India map */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg overflow-hidden border border-cyan-400/20 p-4">
            <svg
              viewBox="0 0 100 85"
              className="w-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="hover-glow">
                  <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background */}
              <rect width="100" height="85" fill="#0f172a" opacity="0.5" />

              {/* State regions */}
              {INDIA_STATES.map((state) => {
                const { color } = getRiskColor(state.risk);
                const isHovered = hoveredState?.id === state.id;
                const isSelected = selectedState?.id === state.id;

                return (
                  <g key={state.id}>
                    <rect
                      x={state.x}
                      y={state.y}
                      width={state.width}
                      height={state.height}
                      fill={color}
                      stroke={isSelected ? '#00d9ff' : '#334155'}
                      strokeWidth={isSelected ? 0.5 : 0.3}
                      opacity={isHovered || isSelected ? 0.95 : 0.8}
                      className="cursor-pointer transition-all duration-200"
                      filter={isHovered || isSelected ? 'url(#hover-glow)' : 'none'}
                      onMouseEnter={() => setHoveredState(state)}
                      onMouseLeave={() => setHoveredState(null)}
                      onClick={() => setSelectedState(state)}
                    />
                    
                    {/* State abbreviation label */}
                    {state.width > 4 && (
                      <text
                        x={state.x + state.width / 2}
                        y={state.y + state.height / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="pointer-events-none select-none"
                        fontSize={Math.max(1.2, state.width * 0.3)}
                        fontWeight="600"
                        fill="#ffffff"
                        opacity={isHovered || isSelected ? 1 : 0.5}
                      >
                        {state.name.split(' ')[0].substring(0, 3)}
                      </text>
                    )}
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

          {/* Selected State Details */}
          {selectedState && (
            <div className="bg-gradient-to-r from-cyan-400/10 to-blue-400/10 border border-cyan-400/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-cyan-300 mb-3">{selectedState.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Risk Level</p>
                  <p className="text-xl font-bold text-cyan-400">{selectedState.risk}%</p>
                  <p className="text-xs text-gray-500">{getRiskColor(selectedState.risk).label}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Active Cases</p>
                  <p className="text-xl font-bold text-blue-400">{selectedState.cases}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Trend</p>
                  <p className="text-xl font-bold text-orange-400">+{selectedState.trend}%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <p className="text-xl font-bold text-green-400">Active</p>
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
