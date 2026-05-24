'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function TrendChart() {
  const data = [
    { week: 'Week 1', cases: 45, avgRisk: 32 },
    { week: 'Week 2', cases: 52, avgRisk: 38 },
    { week: 'Week 3', cases: 48, avgRisk: 35 },
    { week: 'Week 4', cases: 61, avgRisk: 45 },
    { week: 'Week 5', cases: 55, avgRisk: 42 },
    { week: 'Week 6', cases: 68, avgRisk: 51 },
    { week: 'Week 7', cases: 72, avgRisk: 56 },
    { week: 'Week 8', cases: 89, avgRisk: 67 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 border border-cyan-500/50 rounded-lg p-3 backdrop-blur-xl">
          <p className="text-sm text-cyan-400 font-semibold">{payload[0].payload.week}</p>
          <p className="text-sm text-foreground">Cases: {payload[0].value}</p>
          {payload[1] && (
            <p className="text-sm text-blue-400">Avg Risk: {payload[1].value}%</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-foreground">Weekly Trend Analysis</h3>
        <p className="text-sm text-muted-foreground">Cases and risk scores over time</p>
      </div>

      <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00d9ff" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0066ff" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0066ff" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="week" 
                stroke="rgba(255, 255, 255, 0.3)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="rgba(255, 255, 255, 0.3)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="cases"
                stroke="#00d9ff"
                strokeWidth={3}
                dot={{ fill: '#00d9ff', r: 5 }}
                activeDot={{ r: 7, fill: '#00d9ff' }}
                isAnimationActive
              />
              <Line
                type="monotone"
                dataKey="avgRisk"
                stroke="#0066ff"
                strokeWidth={3}
                dot={{ fill: '#0066ff', r: 5 }}
                activeDot={{ r: 7, fill: '#0066ff' }}
                isAnimationActive
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex gap-6 justify-center mt-6 pt-6 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <span className="text-sm text-muted-foreground">Cases</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-muted-foreground">Avg Risk %</span>
          </div>
        </div>
      </div>
    </div>
  );
}
