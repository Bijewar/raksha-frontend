'use client';

import { GlassPanel } from '@/components/base/GlassPanel';
import { AlertTriangle, TrendingUp, Clock } from 'lucide-react';

const alerts = [
  {
    id: 1,
    title: 'Acute Dengue Fever Outbreak',
    district: 'Mumbai',
    severity: 'HIGH',
    riskScore: 85,
    cases: 245,
    timestamp: '2 hours ago',
    recommendation: 'Immediate action required. Increase surveillance and initiate mass vaccination campaigns.',
    trend: 'up',
  },
  {
    id: 2,
    title: 'Malaria Cluster Detection',
    district: 'Delhi',
    severity: 'HIGH',
    riskScore: 72,
    cases: 189,
    timestamp: '4 hours ago',
    recommendation: 'Deploy rapid response teams and distribute antimalarial drugs to affected areas.',
    trend: 'up',
  },
  {
    id: 3,
    title: 'Cholera Risk Alert',
    district: 'Kolkata',
    severity: 'MEDIUM',
    riskScore: 48,
    cases: 112,
    timestamp: '6 hours ago',
    recommendation: 'Enhance water quality monitoring and increase sanitation awareness programs.',
    trend: 'down',
  },
  {
    id: 4,
    title: 'Typhoid Cases Increasing',
    district: 'Pune',
    severity: 'MEDIUM',
    riskScore: 58,
    cases: 134,
    timestamp: '8 hours ago',
    recommendation: 'Investigate food sources and conduct health education in affected communities.',
    trend: 'up',
  },
  {
    id: 5,
    title: 'Measles Vaccination Drive',
    district: 'Jaipur',
    severity: 'LOW',
    riskScore: 45,
    cases: 105,
    timestamp: '12 hours ago',
    recommendation: 'Continue preventive vaccination programs to maintain herd immunity.',
    trend: 'down',
  },
  {
    id: 6,
    title: 'Tuberculosis Screening Program',
    district: 'Bangalore',
    severity: 'LOW',
    riskScore: 38,
    cases: 88,
    timestamp: '1 day ago',
    recommendation: 'Regular monitoring and TB screening in high-risk populations.',
    trend: 'down',
  },
];

const getSeverityColor = (severity) => {
  switch (severity) {
    case 'HIGH':
      return { bg: 'from-red-500/20 to-orange-500/20', border: 'border-red-500/50', badge: 'bg-red-500/30 text-red-400' };
    case 'MEDIUM':
      return { bg: 'from-yellow-500/20 to-orange-500/20', border: 'border-yellow-500/50', badge: 'bg-yellow-500/30 text-yellow-400' };
    default:
      return { bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/50', badge: 'bg-green-500/30 text-green-400' };
  }
};

export function AlertsList() {
  return (
    <div className="space-y-6">
      {alerts.map((alert, idx) => {
        const colors = getSeverityColor(alert.severity);
        
        return (
          <GlassPanel
            key={alert.id}
            className={`!bg-gradient-to-br ${colors.bg} !border-white/10 ${colors.border} p-6 cursor-pointer hover:border-white/20 transition-all duration-300 group animate-slide-up-fade`}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <AlertTriangle size={20} className="text-orange-400 flex-shrink-0" />
                    <h3 className="text-lg font-semibold text-foreground">{alert.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.district}</p>
                </div>
                
                <div className={`${colors.badge} px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap`}>
                  {alert.severity}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y border-white/10">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Risk Score</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${alert.severity === 'HIGH' ? 'from-red-500 to-orange-500' : alert.severity === 'MEDIUM' ? 'from-yellow-500 to-orange-500' : 'from-green-500 to-emerald-500'}`}
                        style={{ width: `${alert.riskScore}%` }}
                      />
                    </div>
                    <span className="font-semibold text-foreground whitespace-nowrap">{alert.riskScore}/100</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Active Cases</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className={alert.trend === 'up' ? 'text-red-400' : 'text-green-400'} />
                    <span className="text-xl font-bold text-foreground">{alert.cases}</span>
                    <span className={`text-xs font-semibold ${alert.trend === 'up' ? 'text-red-400' : 'text-green-400'}`}>
                      {alert.trend === 'up' ? '↑' : '↓'} {Math.abs(Math.floor(Math.random() * 20))}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Last Updated</p>
                  <div className="flex items-center gap-2 text-foreground">
                    <Clock size={16} />
                    <span className="text-sm">{alert.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">AI Recommendation</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {alert.recommendation}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button className="flex-1 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-sm font-medium hover:bg-cyan-500/30 transition-all duration-200">
                  View Details
                </button>
                <button className="flex-1 px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/50 text-blue-400 text-sm font-medium hover:bg-blue-500/30 transition-all duration-200">
                  Take Action
                </button>
              </div>
            </div>
          </GlassPanel>
        );
      })}
    </div>
  );
}
