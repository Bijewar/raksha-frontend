'use client';

import { GlassPanel } from '@/components/base/GlassPanel';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const weeklyData = [
  { week: 'W1', cases: 65, predicted: 70, vaccinated: 85 },
  { week: 'W2', cases: 78, predicted: 82, vaccinated: 88 },
  { week: 'W3', cases: 92, predicted: 88, vaccinated: 90 },
  { week: 'W4', cases: 81, predicted: 85, vaccinated: 91 },
  { week: 'W5', cases: 105, predicted: 110, vaccinated: 92 },
  { week: 'W6', cases: 118, predicted: 115, vaccinated: 94 },
];

const districtRiskData = [
  { district: 'Mumbai', risk: 85, cases: 245 },
  { district: 'Delhi', risk: 72, cases: 189 },
  { district: 'Bangalore', risk: 68, cases: 156 },
  { district: 'Hyderabad', risk: 62, cases: 142 },
  { district: 'Chennai', risk: 55, cases: 128 },
  { district: 'Kolkata', risk: 48, cases: 112 },
];

const riskDistribution = [
  { name: 'LOW', value: 45, fill: '#10b981' },
  { name: 'MEDIUM', value: 32, fill: '#f59e0b' },
  { name: 'HIGH', value: 23, fill: '#ef4444' },
];

const monthlyTrend = [
  { month: 'Jan', outbreak: 12, prevented: 3 },
  { month: 'Feb', outbreak: 14, prevented: 5 },
  { month: 'Mar', outbreak: 18, prevented: 7 },
  { month: 'Apr', outbreak: 15, prevented: 9 },
  { month: 'May', outbreak: 20, prevented: 11 },
  { month: 'Jun', outbreak: 22, prevented: 14 },
];

export function AnalyticsCharts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trends */}
        <GlassPanel variant="default" className="p-6 animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Outbreak Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
              <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(15,15,15,0.9)', border: '1px solid rgba(0,217,255,0.3)' }} />
              <Legend />
              <Line type="monotone" dataKey="cases" stroke="#0066ff" strokeWidth={2} dot={{ r: 4 }} name="Actual Cases" />
              <Line type="monotone" dataKey="predicted" stroke="#00d9ff" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} name="Predicted" />
              <Line type="monotone" dataKey="vaccinated" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Vaccinated %" />
            </LineChart>
          </ResponsiveContainer>
        </GlassPanel>

        {/* Risk Distribution */}
        <GlassPanel variant="default" className="p-6 animate-slide-up-fade" style={{ animationDelay: '200ms' }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </GlassPanel>

        {/* District Risk Levels */}
        <GlassPanel variant="default" className="p-6 animate-slide-up-fade lg:col-span-2" style={{ animationDelay: '300ms' }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Districts by Risk Level</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={districtRiskData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis type="number" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
              <YAxis dataKey="district" type="category" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} width={90} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(15,15,15,0.9)', border: '1px solid rgba(0,217,255,0.3)' }} />
              <Bar dataKey="risk" fill="#0066ff" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassPanel>

        {/* Monthly Outbreaks vs Prevented */}
        <GlassPanel variant="default" className="p-6 animate-slide-up-fade lg:col-span-2" style={{ animationDelay: '400ms' }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Outbreaks vs Preventive Measures</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
              <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(15,15,15,0.9)', border: '1px solid rgba(0,217,255,0.3)' }} />
              <Legend />
              <Area type="monotone" dataKey="outbreak" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="Outbreaks Detected" />
              <Area type="monotone" dataKey="prevented" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Prevented" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassPanel>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
        {[
          { label: 'Total Predictions', value: '2,847', color: 'cyan' },
          { label: 'Accuracy Rate', value: '94.2%', color: 'blue' },
          { label: 'Outbreaks Detected', value: '127', color: 'purple' },
          { label: 'Lives Protected', value: '1.2M+', color: 'green' },
        ].map((stat, idx) => (
          <GlassPanel key={idx} variant="default" className="p-4 text-center animate-slide-up-fade" style={{ animationDelay: `${500 + idx * 100}ms` }}>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{stat.label}</p>
            <p className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</p>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
