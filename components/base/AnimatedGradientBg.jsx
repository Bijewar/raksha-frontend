/**
 * AnimatedGradientBg - Animated gradient background with floating particles
 * Creates cinematic depth with multiple blur layers and animated particles
 */
export function AnimatedGradientBg({ 
  children, 
  className = '',
  variant = 'hero'
}) {
  const variants = {
    hero: {
      gradient: 'from-purple-900/30 via-blue-900/30 to-cyan-900/30',
      particles: true,
    },
    section: {
      gradient: 'from-blue-900/20 via-purple-900/20 to-blue-900/20',
      particles: true,
    },
    subtle: {
      gradient: 'from-slate-900/10 via-slate-900/5 to-slate-900/10',
      particles: false,
    },
  };
  
  const config = variants[variant];
  
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Base animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} animate-gradient-shift`} />
      
      {/* Floating blur layers for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {config.particles && (
          <>
            {/* Floating particles */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float opacity-20" />
            <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-l from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-float animation-delay-2000 opacity-20" />
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float animation-delay-4000 opacity-20" />
          </>
        )}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
