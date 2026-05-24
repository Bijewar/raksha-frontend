/**
 * StatCard - Premium animated stat card with glow effects
 */
export function StatCard({ 
  title, 
  value, 
  unit = '', 
  icon: Icon, 
  trend = null,
  color = 'cyan'
}) {
  const colors = {
    cyan: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30',
    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    purple: 'from-purple-500/20 to-blue-500/20 border-purple-500/30',
    green: 'from-green-500/20 to-cyan-500/20 border-green-500/30',
  };

  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
  };

  return (
    <div className="group h-full animate-slide-up-fade">
      <div className={`relative h-full backdrop-blur-xl bg-gradient-to-br ${colors[color]} border rounded-lg p-8 overflow-hidden transition-all duration-300 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer`}>
        {/* Animated glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-transparent group-hover:from-cyan-500/10 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Header with icon */}
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {title}
            </h3>
            {Icon && (
              <div className="p-3 rounded-lg bg-cyan-500/20 border border-cyan-500/30 group-hover:bg-cyan-500/30 group-hover:border-cyan-500/50 transition-all duration-300">
                <Icon size={20} className="text-cyan-400" />
              </div>
            )}
          </div>

          {/* Value */}
          <div className="mb-4">
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
              {value}
            </div>
            {unit && (
              <p className="text-xs text-muted-foreground mt-2">{unit}</p>
            )}
          </div>

          {/* Trend indicator */}
          {trend && (
            <div className={`flex items-center gap-2 text-sm ${trendColors[trend.direction]}`}>
              <span>{trend.direction === 'up' ? '↑' : '↓'}</span>
              <span>{trend.value}% {trend.label}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
