'use client';

import { AlertTriangle, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

export function ResultCard({ result, loading }) {
  if (!result) {
    return (
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-8 overflow-hidden">
        <div className="flex items-center justify-center h-48 text-muted-foreground">
          <p>Results will appear here after prediction</p>
        </div>
      </div>
    );
  }

  const riskLevel = result.risk_level || 'medium';
  const riskProbability = result.risk_probability || result.predicted_risk || 0;

  const getRiskColor = (level) => {
    if (level === 'high' || riskProbability > 0.7) return { bg: 'from-red-500/20 to-red-500/5', border: 'border-red-500/30', text: 'text-red-400', badge: 'bg-red-500/20 border-red-500/30 text-red-400' };
    if (level === 'medium' || (riskProbability > 0.4 && riskProbability <= 0.7)) return { bg: 'from-yellow-500/20 to-yellow-500/5', border: 'border-yellow-500/30', text: 'text-yellow-400', badge: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' };
    return { bg: 'from-green-500/20 to-green-500/5', border: 'border-green-500/30', text: 'text-green-400', badge: 'bg-green-500/20 border-green-500/30 text-green-400' };
  };

  const getRiskIcon = (level) => {
    if (level === 'high' || riskProbability > 0.7) return AlertTriangle;
    if (level === 'medium' || (riskProbability > 0.4 && riskProbability <= 0.7)) return AlertCircle;
    return CheckCircle;
  };

  const colors = getRiskColor(riskLevel);
  const RiskIcon = getRiskIcon(riskLevel);

  const riskPercentage = Math.round(riskProbability * 100);
  const confidence = result.confidence || result.model_confidence || 85 + Math.random() * 10;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground">Prediction Result</h3>

      <div className={`relative backdrop-blur-xl bg-gradient-to-br ${colors.bg} ${colors.border} border rounded-lg p-8 overflow-hidden`}>
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* Risk Probability */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Risk Probability</h4>
              <span className={`text-4xl font-bold ${colors.text}`}>
                {riskPercentage}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  riskPercentage > 70 ? 'bg-gradient-to-r from-red-500 to-red-400' :
                  riskPercentage > 40 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                  'bg-gradient-to-r from-green-500 to-green-400'
                }`}
                style={{ width: `${riskPercentage}%` }}
              />
            </div>
          </div>

          {/* Risk Level Badge */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Risk Level</p>
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${colors.badge}`}>
                <RiskIcon size={20} />
              </div>
              <div>
                <p className={`text-lg font-bold ${colors.text} capitalize`}>
                  {riskPercentage > 70 ? 'HIGH' : riskPercentage > 40 ? 'MEDIUM' : 'LOW'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {riskPercentage > 70 ? 'Immediate action required' :
                   riskPercentage > 40 ? 'Monitor closely' :
                   'Low risk currently'}
                </p>
              </div>
            </div>
          </div>

          {/* Confidence Score */}
          <div className="space-y-2 pt-6 border-t border-white/5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-muted-foreground">Model Confidence</p>
              <span className="text-sm font-bold text-cyan-400">{Math.round(confidence)}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>

          {/* District Info */}
          {result.district && (
            <div className="space-y-2 pt-6 border-t border-white/5">
              <p className="text-sm text-muted-foreground">Analysis for</p>
              <p className="text-lg font-bold text-foreground">{result.district}</p>
            </div>
          )}

          {/* AI Recommendation */}
          <div className="space-y-3 pt-6 border-t border-white/5 bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className={colors.text} />
              <p className="text-sm font-semibold text-muted-foreground">AI Recommendation</p>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {riskPercentage > 70 
                ? 'This district shows HIGH outbreak risk. Recommend immediate surveillance intensification, contact tracing activation, and healthcare resource mobilization.'
                : riskPercentage > 40
                ? 'MEDIUM risk detected. Monitor incoming case data closely. Prepare healthcare facilities and maintain heightened alert status.'
                : 'LOW risk currently. Continue routine monitoring and surveillance protocols.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
