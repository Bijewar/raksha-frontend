import { AnimatedGradientBg } from '@/components/base/AnimatedGradientBg';
import { AnalyticsCharts } from '@/components/analytics/AnalyticsCharts';

export default function AnalyticsPage() {
  return (
    <main className="flex-1 overflow-auto">
      <AnimatedGradientBg variant="section" className="min-h-screen pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Analytics & Insights
              </h1>
              <p className="text-lg text-muted-foreground">
                Comprehensive data visualizations and trends for outbreak prediction and monitoring.
              </p>
            </div>

            {/* Charts */}
            <AnalyticsCharts />
          </div>
        </div>
      </AnimatedGradientBg>
    </main>
  );
}
