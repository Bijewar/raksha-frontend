'use client';

import { GlassPanel } from '@/components/base/GlassPanel';

const districts = [
  { name: 'Mumbai', risk: 85, cases: 245, lat: 19.0760, lng: 72.8777 },
  { name: 'Delhi', risk: 72, cases: 189, lat: 28.7041, lng: 77.1025 },
  { name: 'Bangalore', risk: 68, cases: 156, lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad', risk: 62, cases: 142, lat: 17.3850, lng: 78.4867 },
  { name: 'Chennai', risk: 55, cases: 128, lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', risk: 48, cases: 112, lat: 22.5726, lng: 88.3639 },
  { name: 'Pune', risk: 58, cases: 134, lat: 18.5204, lng: 73.8567 },
  { name: 'Ahmedabad', risk: 52, cases: 121, lat: 23.0225, lng: 72.5714 },
  { name: 'Jaipur', risk: 45, cases: 105, lat: 26.9124, lng: 75.7873 },
  { name: 'Lucknow', risk: 42, cases: 98, lat: 26.8467, lng: 80.9462 },
  { name: 'Surat', risk: 65, cases: 150, lat: 21.1458, lng: 72.1532 },
  { name: 'Indore', risk: 38, cases: 88, lat: 22.7196, lng: 75.8577 },
];

const getRiskColor = (risk) => {
  if (risk >= 70) return { bg: 'bg-red-500/30', border: 'border-red-500/50', text: 'text-red-400' };
  if (risk >= 50) return { bg: 'bg-yellow-500/30', border: 'border-yellow-500/50', text: 'text-yellow-400' };
  return { bg: 'bg-green-500/30', border: 'border-green-500/50', text: 'text-green-400' };
};

export function IndiaHeatmap() {
  return (
    <div className="space-y-8">
      {/* Map Placeholder with Districts Grid */}
      <GlassPanel variant="ai" className="p-8 animate-slide-up-fade">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-cyan-400">Interactive District Heat Map</h3>
            <p className="text-sm text-muted-foreground">Each district card shows current risk level and case count</p>
          </div>

          {/* Districts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {districts.map((district) => {
              const { bg, border, text } = getRiskColor(district.risk);
              const riskLabel = district.risk >= 70 ? 'HIGH' : district.risk >= 50 ? 'MEDIUM' : 'LOW';
              
              return (
                <div
                  key={district.name}
                  className={`${bg} ${border} border rounded-lg p-4 cursor-pointer hover:bg-opacity-40 transition-all duration-300 group`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-foreground">{district.name}</h4>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${text} bg-white/5`}>
                        {riskLabel}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Risk Score</span>
                        <span className={`font-semibold ${text}`}>{district.risk}/100</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${district.risk >= 70 ? 'from-red-500 to-orange-500' : district.risk >= 50 ? 'from-yellow-500 to-orange-500' : 'from-green-500 to-emerald-500'}`}
                          style={{ width: `${district.risk}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{district.cases}</span> active cases
                    </div>

                    <div className="pt-2 border-t border-white/10 text-xs text-muted-foreground">
                      Lat: {district.lat.toFixed(2)}, Lng: {district.lng.toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </GlassPanel>

      {/* Legend */}
      <GlassPanel variant="default" className="p-6 animate-slide-up-fade">
        <h3 className="text-lg font-semibold text-foreground mb-4">Risk Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 mt-1" />
            <div>
              <p className="font-semibold text-green-400">Low Risk</p>
              <p className="text-xs text-muted-foreground">Risk Score: 0-49</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mt-1" />
            <div>
              <p className="font-semibold text-yellow-400">Medium Risk</p>
              <p className="text-xs text-muted-foreground">Risk Score: 50-69</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 mt-1" />
            <div>
              <p className="font-semibold text-red-400">High Risk</p>
              <p className="text-xs text-muted-foreground">Risk Score: 70-100</p>
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
