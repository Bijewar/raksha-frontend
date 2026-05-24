'use client';

import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { GlassPanel } from '@/components/base/GlassPanel';

// GeoJSON URL for India state boundaries
const geoUrl = 'https://raw.githubusercontent.com/Giveninc/indian-states-topojson/main/india.json';

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

export function DiseaseRiskMap() {
  const [selectedState, setSelectedState] = useState(null);
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(geoUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log('[v0] GeoJSON loaded successfully');
        setGeoData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('[v0] Error loading GeoJSON:', err);
        setLoading(false);
      });
  }, []);

  const getStateName = (properties) => {
    return properties.name || properties.NAME || properties.st_nm || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">Disease Risk Heatmap</h2>
        <p className="text-gray-400">Geographic visualization of disease risk intensity across Indian states</p>
      </div>

      <GlassPanel>
        <div className="space-y-6">
          {loading && (
            <div className="h-96 flex items-center justify-center text-gray-400">
              Loading India map data...
            </div>
          )}

          {geoData && !loading && (
            <>
              {/* Map Container */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg overflow-hidden border border-cyan-400/20 p-4">
                <ComposableMap projection="geoMercator" projectionConfig={{ scale: 1000, center: [78.8, 22.5] }}>
                  <Geographies geography={geoData}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const stateName = getStateName(geo.properties);
                        const riskData = stateRiskData[stateName];
                        const riskValue = riskData?.risk || 30;
                        const { color } = getRiskColor(riskValue);
                        const isSelected = selectedState?.name === stateName;

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            style={{
                              default: {
                                fill: color,
                                stroke: '#1e293b',
                                strokeWidth: 0.75,
                                outline: 'none',
                                cursor: 'pointer',
                                opacity: 0.8,
                                transition: 'all 0.3s ease',
                              },
                              hover: {
                                fill: color,
                                stroke: '#00d9ff',
                                strokeWidth: 1.5,
                                outline: 'none',
                                cursor: 'pointer',
                                opacity: 1,
                                filter: 'drop-shadow(0 0 8px rgba(0, 217, 255, 0.6))',
                              },
                              pressed: {
                                fill: color,
                                stroke: '#00d9ff',
                                strokeWidth: 2,
                                outline: 'none',
                              },
                            }}
                            onClick={() => setSelectedState(riskData ? { name: stateName, ...riskData } : null)}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ComposableMap>
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
            </>
          )}
        </div>
      </GlassPanel>
    </div>
  );
}
