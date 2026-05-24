'use client';

import { PredictionForm } from '@/components/prediction/PredictionForm';
import { AnimatedGradientBg } from '@/components/base/AnimatedGradientBg';

export default function PredictionPage() {
  return (
    <main className="flex-1 overflow-auto">
      <AnimatedGradientBg variant="section" className="min-h-screen pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Disease Outbreak Risk Prediction
              </h1>
              <p className="text-lg text-muted-foreground">
                Enter district and environmental data to predict outbreak risk. Our AI model analyzes 18 key parameters to provide accurate risk assessments.
              </p>
            </div>

            {/* Form */}
            <PredictionForm />
          </div>
        </div>
      </AnimatedGradientBg>
    </main>
  );
}
