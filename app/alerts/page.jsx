import { AnimatedGradientBg } from '@/components/base/AnimatedGradientBg';
import { AlertsList } from '@/components/alerts/AlertsList';

export default function AlertsPage() {
  return (
    <main className="flex-1 overflow-auto">
      <AnimatedGradientBg variant="section" className="min-h-screen pt-20 pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Outbreak Alerts
              </h1>
              <p className="text-lg text-muted-foreground">
                Real-time alerts and notifications for disease outbreaks across monitored districts.
              </p>
            </div>

            {/* Alerts */}
            <AlertsList />
          </div>
        </div>
      </AnimatedGradientBg>
    </main>
  );
}
