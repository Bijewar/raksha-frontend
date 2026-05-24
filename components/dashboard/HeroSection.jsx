/**
 * HeroSection - Premium hero section with gradient text and description
 */
export function HeroSection() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8">
      <div className="space-y-6 text-center md:text-left">
        {/* Main title */}
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
              Raksha AI
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mt-4">
            Advanced AI-Powered Outbreak Forecasting & Risk Prediction
          </p>
        </div>

        {/* Subtitle */}
        <div className="max-w-2xl mx-auto md:mx-0">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Predict disease outbreaks with precision. Leverage machine learning models trained on historical data, 
            environmental factors, and real-time indicators to stay ahead of health crises.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 md:pt-4 justify-center md:justify-start">
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
            Start Predicting
          </button>
          <button className="px-8 py-3 rounded-lg border border-cyan-500/50 text-cyan-400 font-semibold hover:bg-cyan-500/10 transition-all duration-300">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
