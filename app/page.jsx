'use client';

import { useState } from 'react';
import { AnimatedGradientBg } from '@/components/base/AnimatedGradientBg';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { StatCardsGrid } from '@/components/dashboard/StatCardsGrid';
import { PredictionForm } from '@/components/dashboard/PredictionForm';
import { ResultCard } from '@/components/dashboard/ResultCard';
import { TrendChart } from '@/components/dashboard/TrendChart';
import { DiseaseRiskMap } from '@/components/dashboard/DiseaseRiskMap';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { DashboardFooter } from '@/components/dashboard/DashboardFooter';

export default function Dashboard() {
  const [predictionResult, setPredictionResult] = useState(null);
  const [loadingResult, setLoadingResult] = useState(false);

  const handlePredictionResult = (result) => {
    setLoadingResult(true);
    // Simulate result processing delay
    setTimeout(() => {
      setPredictionResult(result);
      setLoadingResult(false);
    }, 500);
  };

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

      {/* Prediction Section */}
      <div className="px-6 md:px-8 py-12">
        <PredictionForm onPredictionResult={handlePredictionResult} />
      </div>

      {/* Result Card */}
      {predictionResult && (
        <div className="px-6 md:px-8 py-12">
          <ResultCard result={predictionResult} loading={loadingResult} />
        </div>
      )}

      {/* Trend Chart */}
      <div className="px-6 md:px-8 py-12">
        <TrendChart />
      </div>

      {/* Disease Risk Map */}
      <div className="px-6 md:px-8 py-12">
        <DiseaseRiskMap />
      </div>

      {/* Alerts Panel */}
      <div className="px-6 md:px-8 py-12">
        <AlertsPanel />
      </div>

      {/* Footer */}
      <div className="px-6 md:px-8">
        <DashboardFooter />
      </div>
    </main>
  );
}
