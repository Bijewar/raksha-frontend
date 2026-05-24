'use client';

import { Heart, Shield, TrendingUp } from 'lucide-react';

export function DashboardFooter() {
  return (
    <footer className="relative mt-20 border-t border-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-16 space-y-12">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left - Branding */}
          <div className="space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Raksha AI
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Advanced AI-powered disease outbreak surveillance system leveraging IDSP weekly reports and machine learning for early detection and risk prediction.
            </p>
          </div>

          {/* Center - Features */}
          <div className="space-y-6">
            <h3 className="font-bold text-foreground uppercase tracking-wider text-sm">Key Features</h3>
            <div className="space-y-4">
              {[
                { icon: Shield, label: 'Real-time Surveillance' },
                { icon: TrendingUp, label: 'Predictive Analytics' },
                { icon: Heart, label: 'Health Insights' },
              ].map(({ icon: Icon, label }, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Icon size={16} className="text-cyan-400 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Contact */}
          <div className="space-y-6">
            <h3 className="font-bold text-foreground uppercase tracking-wider text-sm">Support</h3>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Supported by: <span className="text-cyan-400 font-semibold">Government of India</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Data Source: <span className="text-cyan-400 font-semibold">IDSP Weekly Reports</span>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Bottom */}
        <div className="space-y-6">
          {/* Tagline */}
          <div className="relative backdrop-blur-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-6 text-center">
            <p className="text-lg font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
              ✨ Early detection saves lives ✨
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Empowering public health officials with AI-driven insights for better outbreak prevention and control.
            </p>
          </div>

          {/* Footer links and info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6">
            <div className="text-center md:text-left">
              <p className="text-xs text-muted-foreground">
                Built with advanced machine learning • Powered by latest epidemiological research
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                © 2024 Raksha AI • All Rights Reserved
              </p>
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                Documentation
              </a>
              <a href="#" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                API Reference
              </a>
              <a href="#" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
