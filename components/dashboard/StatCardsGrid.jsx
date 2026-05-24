'use client';

import { AlertCircle, TrendingUp, Activity, Zap } from 'lucide-react';
import { StatCard } from './StatCard';

export function StatCardsGrid() {
  const stats = [
    {
      title: 'Active Districts',
      value: '12',
      unit: 'under monitoring',
      icon: AlertCircle,
      color: 'cyan',
      trend: { direction: 'up', value: 4, label: 'this week' }
    },
    {
      title: 'High Risk Alerts',
      value: '3',
      unit: 'critical level',
      icon: TrendingUp,
      color: 'blue',
      trend: { direction: 'down', value: 2, label: 'from last week' }
    },
    {
      title: 'Avg Risk Score',
      value: '67.3',
      unit: 'medium-high risk',
      icon: Activity,
      color: 'purple',
      trend: { direction: 'up', value: 8, label: 'increase' }
    },
    {
      title: 'Predictions Made',
      value: '248',
      unit: 'this month',
      icon: Zap,
      color: 'green',
      trend: { direction: 'up', value: 12, label: 'vs last month' }
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Quick Overview</h2>
        <p className="text-muted-foreground">Monitor key metrics at a glance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>
    </div>
  );
}
