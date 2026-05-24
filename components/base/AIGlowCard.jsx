/**
 * AIGlowCard - Premium card with animated glow and AI styling
 * Features animated gradient borders and pulsing glow effect
 */
export function AIGlowCard({ 
  children, 
  className = '',
  glowColor = 'cyan',
  hover = true,
  ...props 
}) {
  const glowColors = {
    cyan: 'from-cyan-500/50 to-blue-500/50',
    blue: 'from-blue-500/50 to-cyan-500/50',
    purple: 'from-purple-500/50 to-blue-500/50',
  };
  
  return (
    <div
      className={`relative rounded-lg overflow-hidden animate-slide-up-fade ${className}`}
      {...props}
    >
      {/* Animated glow background */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${glowColors[glowColor]} opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-lg pointer-events-none`}
      />
      
      {/* Main glass container */}
      <div className={`relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6 ${hover ? 'group hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10' : ''}`}>
        {children}
      </div>
    </div>
  );
}
