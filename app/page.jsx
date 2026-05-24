import { AnimatedGradientBg } from '@/components/base/AnimatedGradientBg';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { StatCardsGrid } from '@/components/dashboard/StatCardsGrid';
import { ChartPreview } from '@/components/dashboard/ChartPreview';

export default function Dashboard() {
  return (
    <main className="flex-1 overflow-auto">
      {/* Hero Section with animated background */}
      <AnimatedGradientBg variant="hero" className="min-h-96 pt-32 pb-20">
        <HeroSection />
      </AnimatedGradientBg>

      {/* Stat Cards */}
      <div className="px-6 md:px-8 py-12">
        <StatCardsGrid />
      </div>

      {/* Charts Preview */}
      <div className="px-6 md:px-8 py-12">
        <ChartPreview />
      </div>

      {/* Footer spacing */}
      <div className="h-20" />
    </main>
  );
}
