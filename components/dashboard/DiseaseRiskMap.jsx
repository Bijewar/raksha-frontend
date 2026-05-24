'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { GlassPanel } from '@/components/base/GlassPanel';

// State coordinates and risk data for India heatmap
const STATES_HEATMAP = [
  // High risk states (red)
  { name: 'Delhi', risk: 'high', x: 60, y: 18, width: 8, height: 6, cases: 298, activeRate: 8.5 },
  { name: 'Madhya Pradesh', risk: 'high', x: 35, y: 35, width: 18, height: 16, cases: 1012, activeRate: 7.8 },
  { name: 'Maharashtra', risk: 'high', x: 20, y: 45, width: 15, height: 18, cases: 468, activeRate: 7.2 },
  
  // Medium risk states (yellow/orange)
  { name: 'Rajasthan', risk: 'medium', x: 25, y: 20, width: 18, height: 18, cases: 156, activeRate: 4.8 },
  { name: 'Gujarat', risk: 'medium', x: 12, y: 30, width: 12, height: 18, cases: 219, activeRate: 5.1 },
  { name: 'Uttar Pradesh', risk: 'medium', x: 50, y: 25, width: 20, height: 15, cases: 134, activeRate: 3.2 },
  { name: 'Telangana', risk: 'medium', x: 42, y: 55, width: 12, height: 12, cases: 87, activeRate: 2.9 },
  
  // Low risk states (green)
  { name: 'Tamil Nadu', risk: 'low', x: 42, y: 72, width: 14, height: 12, cases: 45, activeRate: 1.2 },
  { name: 'Karnataka', risk: 'low', x: 28, y: 62, width: 14, height: 14, cases: 52, activeRate: 1.5 },
  { name: 'Andhra Pradesh', risk: 'low', x: 40, y: 65, width: 15, height: 12, cases: 38, activeRate: 1.1 },
  { name: 'Kerala', risk: 'low', x: 32, y: 80, width: 8, height: 8, cases: 25, activeRate: 0.8 },
];

const getRiskColor = (risk) => {
  switch (risk) {
    case 'high':
      return {
        fill: '#ef4444',
        fillOpacity: 0.7,
        strokeColor: '#dc2626',
        hoverFill: '#ff6b6b',
        glowColor: 'rgb(239, 68, 68)',
        label: 'High Risk',
      };
    case 'medium':
      return {
        fill: '#f59e0b',
        fillOpacity: 0.65,
        strokeColor: '#d97706',
        hoverFill: '#fbbf24',
        glowColor: 'rgb(245, 158, 11)',
        label: 'Medium Risk',
      };
    case 'low':
    default:
      return {
        fill: '#10b981',
        fillOpacity: 0.6,
        strokeColor: '#059669',
        hoverFill: '#6ee7b7',
        glowColor: 'rgb(16, 185, 129)',
        label: 'Low Risk',
      };
  }
};

export function DiseaseRiskMap() {
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Disease Risk Heatmap</h2>
        <p className="text-muted-foreground">Geographic intensity of disease outbreak across India</p>
      </div>

      <GlassPanel>
        <div className="space-y-6">
          {/* SVG Heatmap */}
          <div className="w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden border border-white/10 p-4">
            <svg
              viewBox="0 0 100 100"
              className="w-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background */}
              <defs>
                <filter id="glow-high">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-medium">
                  <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-low">
                  <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="100" height="100" fill="#1e293b" opacity="0.5" />

              {/* State regions */}
              {STATES_HEATMAP.map((state) => {
                const colors = getRiskColor(state.risk);
                const isHovered = hoveredState?.name === state.name;
                const isSelected = selectedState?.name === state.name;

                return (
                  <g key={state.name}>
                    {/* Region rectangle with glow effect */}
                    <rect
                      x={state.x}
                      y={state.y}
                      width={state.width}
                      height={state.height}
                      fill={isHovered || isSelected ? colors.hoverFill : colors.fill}
                      opacity={isHovered || isSelected ? 0.85 : colors.fillOpacity}
                      stroke={colors.strokeColor}
                      strokeWidth="0.3"
                      filter={`url(#glow-${state.risk})`}
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredState(state)}
                      onMouseLeave={() => setHoveredState(null)}
                      onClick={() => setSelectedState(state)}
                    />

                    {/* State label */}
                    <text
                      x={state.x + state.width / 2}
                      y={state.y + state.height / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="pointer-events-none select-none"
                      fontSize="2.5"
                      fontWeight="600"
                      fill="#ffffff"
                      opacity={isHovered || isSelected ? 1 : 0.4}
                      style={{
                        textShadow: `0 0 8px ${colors.glowColor}`,
                        transition: 'opacity 0.3s',
                      }}
                    >
                      {state.name.split(' ')[0]}
                    </text>

                    {/* Risk indicator dot */}
                    <circle
                      cx={state.x + state.width - 1}
                      cy={state.y + 1}
                      r="0.6"
                      fill={colors.fill}
                      opacity={isHovered || isSelected ? 1 : 0.8}
                      filter={`url(#glow-${state.risk})`}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-3 gap-4">
            {['high', 'medium', 'low'].map((riskLevel) => {
              const colors = getRiskColor(riskLevel);
              const count = STATES_HEATMAP.filter(s => s.risk === riskLevel).length;

              return (
                <div
                  key={riskLevel}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div
                    className="w-4 h-4 rounded flex-shrink-0"
                    style={{
                      backgroundColor: colors.fill,
                      boxShadow: `0 0 12px ${colors.glowColor}`,
                      opacity: colors.fillOpacity,
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{colors.label}</p>
                    <p className="text-xs text-muted-foreground">{count} region{count !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected State Details */}
          {selectedState && (
            <div className="relative p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Selected Region</p>
                    <h3 className="text-2xl font-bold text-foreground">{selectedState.name}</h3>
                  </div>
                  <div
                    className="px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap"
                    style={{
                      backgroundColor: getRiskColor(selectedState.risk).fill + '33',
                      color: getRiskColor(selectedState.risk).fill,
                      border: `1px solid ${getRiskColor(selectedState.risk).fill}`,
                    }}
                  >
                    {getRiskColor(selectedState.risk).label}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Active Cases</p>
                    <p className="text-2xl font-bold text-cyan-400">{selectedState.cases}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Activity Rate</p>
                    <p className="text-2xl font-bold text-blue-400">{selectedState.activeRate.toFixed(1)}/10</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Trend</p>
                    <p className="text-2xl font-bold text-orange-400">↑ 12%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Response</p>
                    <p className="text-2xl font-bold text-green-400">Active</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Panel */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <MapPin size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-blue-400">Interactive Heatmap</p>
              <p className="text-xs text-muted-foreground">
                Colors indicate disease risk intensity. Hover or click regions for detailed metrics and outbreak information.
              </p>
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
