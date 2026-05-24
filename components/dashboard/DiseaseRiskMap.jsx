'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { GlassPanel } from '@/components/base/GlassPanel';

// Mock India district data with risk levels
const DISTRICTS_DATA = [
  // Madhya Pradesh
  { name: 'Indore', state: 'Madhya Pradesh', risk: 'high', lat: 22.7196, lng: 75.8577, cases: 285 },
  { name: 'Bhopal', state: 'Madhya Pradesh', risk: 'high', lat: 23.1815, lng: 79.9864, cases: 256 },
  { name: 'Jabalpur', state: 'Madhya Pradesh', risk: 'medium', lat: 23.1815, lng: 79.9864, cases: 142 },
  { name: 'Gwalior', state: 'Madhya Pradesh', risk: 'medium', lat: 26.2389, lng: 78.1604, cases: 128 },
  { name: 'Ujjain', state: 'Madhya Pradesh', risk: 'low', lat: 23.1815, lng: 75.7889, cases: 45 },
  
  // Surrounding states
  { name: 'Pune', state: 'Maharashtra', risk: 'high', lat: 18.5204, lng: 73.8567, cases: 312 },
  { name: 'Nagpur', state: 'Maharashtra', risk: 'medium', lat: 21.1458, lng: 79.0882, cases: 156 },
  { name: 'Ahmedabad', state: 'Gujarat', risk: 'medium', lat: 23.0225, lng: 72.5714, cases: 167 },
  { name: 'Surat', state: 'Gujarat', risk: 'low', lat: 21.1702, lng: 72.8311, cases: 52 },
  { name: 'Jaipur', state: 'Rajasthan', risk: 'low', lat: 26.9124, lng: 75.7873, cases: 38 },
  { name: 'Lucknow', state: 'Uttar Pradesh', risk: 'medium', lat: 26.8467, lng: 80.9462, cases: 134 },
  { name: 'Delhi', state: 'Delhi', risk: 'high', lat: 28.7041, lng: 77.1025, cases: 298 },
];

const getRiskColor = (risk) => {
  switch (risk) {
    case 'high':
      return { bg: '#ef4444', border: '#dc2626', text: 'text-red-400', label: 'High Risk' };
    case 'medium':
      return { bg: '#f59e0b', border: '#d97706', text: 'text-yellow-400', label: 'Medium Risk' };
    case 'low':
    default:
      return { bg: '#10b981', border: '#059669', text: 'text-green-400', label: 'Low Risk' };
  }
};

export function DiseaseRiskMap() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);

  // Simple map positioning (Mercator projection approximation)
  const projectCoordinates = (lat, lng) => {
    const centerLat = 23;
    const centerLng = 78;
    const scale = 80;
    
    const x = 50 + (lng - centerLng) * scale * 0.8;
    const y = 50 + (centerLat - lat) * scale;
    
    return { x, y };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Disease Risk Map</h2>
        <p className="text-muted-foreground">Geographic distribution of outbreak risk across regions</p>
      </div>

      <GlassPanel>
        <div className="space-y-6">
          {/* Map Container */}
          <div className="relative w-full aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden border border-white/10">
            {/* India outline (stylized) */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full opacity-10"
              preserveAspectRatio="none"
            >
              <path
                d="M 30 20 L 80 15 L 85 40 L 80 70 L 50 85 L 20 75 L 15 45 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-cyan-400"
              />
            </svg>

            {/* District nodes */}
            <div className="absolute inset-0">
              {DISTRICTS_DATA.map((district) => {
                const { x, y } = projectCoordinates(district.lat, district.lng);
                const colors = getRiskColor(district.risk);
                const isSelected = selectedDistrict?.name === district.name;
                const isHovered = hoveredDistrict?.name === district.name;

                return (
                  <div
                    key={district.name}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onMouseEnter={() => setHoveredDistrict(district)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                    onClick={() => setSelectedDistrict(district)}
                  >
                    {/* Pulse rings */}
                    <div
                      className="absolute inset-0 rounded-full animate-pulse"
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: colors.bg,
                        opacity: 0.2,
                        transform: 'translate(-50%, -50%)',
                        left: '50%',
                        top: '50%',
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-full animate-pulse"
                      style={{
                        width: '28px',
                        height: '28px',
                        backgroundColor: colors.bg,
                        opacity: 0.4,
                        transform: 'translate(-50%, -50%)',
                        left: '50%',
                        top: '50%',
                        animationDelay: '0.3s',
                      }}
                    />

                    {/* Center dot */}
                    <div
                      className={`absolute rounded-full transition-all duration-300 ${
                        isSelected || isHovered ? 'ring-2 ring-offset-2' : ''
                      }`}
                      style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: colors.bg,
                        transform: 'translate(-50%, -50%)',
                        left: '50%',
                        top: '50%',
                        boxShadow: `0 0 20px ${colors.bg}`,
                        border: `2px solid ${colors.border}`,
                        ringColor: colors.bg,
                        ringOffsetColor: '#0f0f0f',
                      }}
                    />

                    {/* Tooltip on hover */}
                    {(isHovered || isSelected) && (
                      <div className="absolute -top-24 -left-32 w-64 bg-slate-900/95 border border-white/20 rounded-lg p-3 z-10 backdrop-blur-md pointer-events-none animate-slide-up-fade">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <p className="font-bold text-foreground">{district.name}</p>
                            <p className="text-xs text-muted-foreground">{district.state}</p>
                          </div>
                          <div
                            className="px-2 py-1 rounded text-xs font-semibold"
                            style={{
                              backgroundColor: `${colors.bg}33`,
                              color: colors.bg,
                              border: `1px solid ${colors.bg}`,
                            }}
                          >
                            {colors.label}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Active Cases:</span>
                          <span className="font-bold" style={{ color: colors.bg }}>
                            {district.cases}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Map controls/legend overlay */}
            <div className="absolute bottom-4 left-4 flex gap-2 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-lg p-4">
              <MapPin size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">Click a district for details</p>
                <p className="text-xs text-muted-foreground">Hover to preview information</p>
              </div>
            </div>
          </div>

          {/* Risk Level Legend */}
          <div className="grid grid-cols-3 gap-4">
            {['high', 'medium', 'low'].map((riskLevel) => {
              const colors = getRiskColor(riskLevel);
              const count = DISTRICTS_DATA.filter(d => d.risk === riskLevel).length;

              return (
                <div
                  key={riskLevel}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10"
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: colors.bg, boxShadow: `0 0 12px ${colors.bg}` }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{colors.label}</p>
                    <p className="text-xs text-muted-foreground">{count} district{count !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected District Details */}
          {selectedDistrict && (
            <div className="relative p-4 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Selected District</p>
                    <h3 className="text-xl font-bold text-foreground">{selectedDistrict.name}</h3>
                  </div>
                  <div
                    className="px-3 py-1 rounded-lg font-semibold text-sm"
                    style={{
                      backgroundColor: getRiskColor(selectedDistrict.risk).bg + '33',
                      color: getRiskColor(selectedDistrict.risk).bg,
                      border: `1px solid ${getRiskColor(selectedDistrict.risk).bg}`,
                    }}
                  >
                    {getRiskColor(selectedDistrict.risk).label}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/5">
                  <div>
                    <p className="text-xs text-muted-foreground">State</p>
                    <p className="text-sm font-semibold text-foreground">{selectedDistrict.state}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Active Cases</p>
                    <p className="text-sm font-semibold text-cyan-400">{selectedDistrict.cases}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Risk Score</p>
                    <p className="text-sm font-semibold text-blue-400">
                      {selectedDistrict.risk === 'high' ? '8.5/10' : selectedDistrict.risk === 'medium' ? '5.2/10' : '2.1/10'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </GlassPanel>
    </div>
  );
}
