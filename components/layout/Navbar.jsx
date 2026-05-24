'use client';

import { Search } from 'lucide-react';
import { GlassPanel } from '@/components/base/GlassPanel';

export function Navbar() {
  return (
    <GlassPanel
      variant="dark"
      className="fixed top-0 right-0 left-0 md:left-64 z-30 rounded-none border-b border-t-0 border-l-0 border-r-0"
    >
      <div className="flex items-center justify-between px-6 py-4 h-20">
        {/* Left spacer for mobile */}
        <div className="hidden md:block" />
        
        {/* Search bar */}
        <div className="flex-1 max-w-md mx-auto md:mx-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search districts, alerts..."
              className="w-full px-4 py-2 pl-10 rounded-lg bg-white/5 border border-white/10 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-200"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        {/* Right section */}
        <div className="hidden md:flex items-center gap-6">
          <button
            className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-medium hover:bg-blue-500/30 hover:border-blue-500/50 transition-all duration-200"
          >
            Documentation
          </button>
        </div>
      </div>
    </GlassPanel>
  );
}
