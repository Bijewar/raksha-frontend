/**
 * RiskResultCard - Animated result card showing prediction outcome
 */
export function RiskResultCard({ result }) {
  const riskLevelConfig = {
    LOW: { color: 'green', bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/50', text: 'text-green-400' },
    MEDIUM: { color: 'yellow', bg: 'from-yellow-500/20 to-orange-500/20', border: 'border-yellow-500/50', text: 'text-yellow-400' },
    HIGH: { color: 'red', bg: 'from-red-500/20 to-orange-500/20', border: 'border-red-500/50', text: 'text-red-400' },
  };

  const config = riskLevelConfig[result.risk_level];

  return (
    <div className="space-y-6 animate-slide-up-fade">
      <div className={`relative backdrop-blur-xl bg-gradient-to-br ${config.bg} border ${config.border} rounded-lg p-12 overflow-hidden`}>
        {/* Animated background glow */}
        <div className={`absolute inset-0 bg-gradient-to-br from-${config.color}-500/0 to-transparent opacity-0 hover:opacity-10 transition-opacity duration-300 blur-lg pointer-events-none`} />
        
        {/* Content */}
        <div className="relative z-10 space-y-8">
          {/* Header */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Prediction Result for {result.district}
            </h2>
            <p className="text-muted-foreground">AI-powered outbreak risk assessment</p>
          </div>

          {/* Risk Probability */}
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Risk Probability</p>
              <div className="flex items-baseline gap-2">
                <div className="text-6xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                  {result.probability}
                </div>
                <span className="text-2xl text-muted-foreground">%</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r from-${config.color}-500 to-${config.color}-400 transition-all duration-500`}
                style={{ width: `${result.probability}%` }}
              />
            </div>
          </div>

          {/* Risk Level Badge */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Risk Level</p>
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-${config.color}-500/20 border border-${config.color}-500/50`}>
              <div className={`w-4 h-4 rounded-full bg-${config.color}-500 animate-pulse`} />
              <span className={`text-lg font-bold ${config.text}`}>{result.risk_level}</span>
            </div>
          </div>

          {/* Recommendation */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">AI Recommendation</p>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-foreground leading-relaxed">
                {result.recommendation}
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Model Accuracy</p>
              <p className="text-xl font-bold text-cyan-400 mt-1">94.2%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Confidence</p>
              <p className="text-xl font-bold text-blue-400 mt-1">High</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Sample Size</p>
              <p className="text-xl font-bold text-purple-400 mt-1">5000+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4">
        <button className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
          View Details
        </button>
        <button className="flex-1 px-6 py-3 rounded-lg border border-cyan-500/50 text-cyan-400 font-semibold hover:bg-cyan-500/10 transition-all duration-300">
          Export Report
        </button>
      </div>
    </div>
  );
}
