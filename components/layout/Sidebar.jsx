'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, MapPin, AlertCircle, TrendingUp, Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { GlassPanel } from '@/components/base/GlassPanel';

const navItems = [
  { href: '/', label: 'Dashboard', icon: BarChart3 },
  { href: '/prediction', label: 'Prediction', icon: TrendingUp },
  { href: '/analytics', label: 'Analytics', icon: Zap },
  { href: '/heatmap', label: 'Heatmap', icon: MapPin },
  { href: '/alerts', label: 'Alerts', icon: AlertCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-6 left-6 z-50 p-2 text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <GlassPanel
        variant="dark"
        className={`fixed left-0 top-0 h-screen w-64 z-40 p-8 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:rounded-none rounded-r-2xl`}
      >
        {/* Logo */}
        <div className="mb-12">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Raksha AI
          </div>
          <p className="text-xs text-muted-foreground mt-1">Outbreak Forecasting</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-500/20 border border-blue-500/50 text-cyan-400'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="text-xs text-muted-foreground text-center pt-6 border-t border-white/10">
          <p>Powered by AI</p>
          <p className="text-xs mt-1">v1.0</p>
        </div>
      </GlassPanel>
    </>
  );
}
