import { AnimatedGradientBg } from '@/components/base/AnimatedGradientBg';
import { IndiaHeatmap } from '@/components/heatmap/IndiaHeatmap';

export default function HeatmapPage() {
  return (
    <main className="flex-1 overflow-auto">
      <AnimatedGradientBg variant="section" className="min-h-screen pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                District Risk Heatmap
              </h1>
              <p className="text-lg text-muted-foreground">
                Interactive map showing disease outbreak risk levels across Indian districts.
              </p>
            </div>

            {/* Heatmap */}
            <IndiaHeatmap />
          </div>
        </div>
      </AnimatedGradientBg>
    </main>
  );
}
