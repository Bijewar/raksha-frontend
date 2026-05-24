'use client';

import { AlertTriangle, AlertCircle, TrendingUp, X } from 'lucide-react';

const alertsData = [
  {
    id: 1,
    level: 'high',
    title: 'Dengue Rising in Indore',
    description: 'Cases increased by 35% week-on-week. Immediate surveillance required.',
    time: '2 hours ago',
    district: 'Indore'
  },
  {
    id: 2,
    level: 'medium',
    title: 'Bhopal Crossed Alert Threshold',
    description: 'Malaria cases exceeded 85. Healthcare facilities on standby.',
    time: '4 hours ago',
    district: 'Bhopal'
  },
  {
    id: 3,
    level: 'high',
    title: 'Unusual Spike Detected in Gwalior',
    description: 'Dengue pattern matches outbreak indicators. Activate testing protocols.',
    time: '3 hours ago',
    district: 'Gwalior'
  },
  {
    id: 4,
    level: 'medium',
    title: 'Vaccination Coverage Below Target',
    description: 'Sagar district vaccination rate dropped to 58%. Plan mass camp.',
    time: '6 hours ago',
    district: 'Sagar'
  },
];

export function AlertsPanel() {
  const handleDismiss = (id) => {
    // Alert dismiss logic would go here
    console.log('Dismissed alert:', id);
  };

  const getAlertStyles = (level) => {
    if (level === 'high') {
      return {
        container: 'border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-500/5',
        icon: AlertTriangle,
        iconColor: 'text-red-400',
        titleColor: 'text-red-400',
        badge: 'bg-red-500/20 border-red-500/30 text-red-400'
      };
    }
    return {
      container: 'border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5',
      icon: AlertCircle,
      iconColor: 'text-yellow-400',
      titleColor: 'text-yellow-400',
      badge: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">Active Alerts</h3>
          <p className="text-sm text-muted-foreground">Critical and important surveillance alerts</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold">
          {alertsData.length} Active
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {alertsData.map((alert) => {
          const styles = getAlertStyles(alert.level);
          const Icon = styles.icon;

          return (
            <div
              key={alert.id}
              className={`relative backdrop-blur-xl border rounded-lg p-6 overflow-hidden hover:border-opacity-100 transition-all duration-300 ${styles.container}`}
            >
              {/* Background accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${styles.badge}`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold text-sm mb-1 ${styles.titleColor}`}>
                        {alert.title}
                      </h4>
                      <p className="text-sm text-foreground leading-relaxed">
                        {alert.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDismiss(alert.id)}
                    className="flex-shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X size={16} className="text-muted-foreground hover:text-foreground" />
                  </button>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-semibold text-muted-foreground">
                      {alert.district}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
            <TrendingUp size={20} className="text-cyan-400" />
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-1">Key Insights</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dengue is showing consistent growth across high-density urban areas. Activation of vector control measures and mass awareness campaigns recommended. Coordination with local health authorities for resource mobilization is critical.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
