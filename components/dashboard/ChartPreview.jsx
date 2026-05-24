'use client';

import { GlassPanel } from '@/components/base/GlassPanel';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trendData = [
  { month: 'Jan', cases: 65, predicted: 70 },
  { month: 'Feb', cases: 78, predicted: 82 },
  { month: 'Mar', cases: 92, predicted: 88 },
  { month: 'Apr', cases: 81, predicted: 85 },
  { month: 'May', cases: 105, predicted: 110 },
  { month: 'Jun', cases: 118, predicted: 115 },
];

const rainfallData = [
  { month: 'Jan', rainfall: 45, cases: 65 },
  { month: 'Feb', rainfall: 52, cases: 78 },
  { month: 'Mar', rainfall: 68, cases: 92 },
  { month: 'Apr', rainfall: 55, cases: 81 },
  { month: 'May', rainfall: 85, cases: 105 },
  { month: 'Jun', rainfall: 72, cases: 118 },
];

const riskDistribution = [
  { risk: 'LOW', count: 45, fill: '#10b981' },
  { risk: 'MEDIUM', count: 32, fill: '#f59e0b' },
  { risk: 'HIGH', count: 23, fill: '#ef4444' },
];

export function ChartPreview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Analytics Preview</h2>
        <p className="text-muted-foreground">View detailed charts and insights in Analytics page</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <GlassPanel variant="default" className="p-6 animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Outbreak Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
              <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(15,15,15,0.8)', border: '1px solid rgba(0,217,255,0.2)' }} />
              <Line type="monotone" dataKey="cases" stroke="#0066ff" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="predicted" stroke="#00d9ff" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </GlassPanel>

        {/* Rainfall vs Cases */}
        <GlassPanel variant="default" className="p-6 animate-slide-up-fade" style={{ animationDelay: '200ms' }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Rainfall vs Cases</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={rainfallData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
              <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(15,15,15,0.8)', border: '1px solid rgba(0,217,255,0.2)' }} />
              <Area type="monotone" dataKey="rainfall" stackId="1" stroke="#00d9ff" fill="#00d9ff" fillOpacity={0.3} />
              <Area type="monotone" dataKey="cases" stackId="1" stroke="#0066ff" fill="#0066ff" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassPanel>

        {/* Risk Distribution */}
        <GlassPanel variant="default" className="p-6 animate-slide-up-fade" style={{ animationDelay: '300ms' }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={riskDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
              <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(15,15,15,0.8)', border: '1px solid rgba(0,217,255,0.2)' }} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassPanel>

        {/* Quick Stats */}
        <GlassPanel variant="default" className="p-6 animate-slide-up-fade" style={{ animationDelay: '400ms' }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <span className="text-muted-foreground">Highest Risk District</span>
              <span className="font-semibold text-cyan-400">Mumbai</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <span className="text-muted-foreground">Districts Improving</span>
              <span className="font-semibold text-green-400">5 / 12</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <span className="text-muted-foreground">Prediction Accuracy</span>
              <span className="font-semibold text-blue-400">94.2%</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">Avg Response Time</span>
              <span className="font-semibold text-purple-400">2.5h</span>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
