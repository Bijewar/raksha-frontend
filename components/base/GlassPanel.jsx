/**
 * GlassPanel - Premium glassmorphic container component
 * Provides base glass effect styling with customizable variants
 */
export function GlassPanel({ 
  children, 
  className = '', 
  variant = 'default',
  animated = false,
  ...props 
}) {
  const baseStyles = 'backdrop-blur-xl border rounded-lg';
  
  const variants = {
    default: 'bg-white/5 border-white/10 shadow-lg',
    ai: 'bg-cyan-500/5 border-cyan-500/20 shadow-lg',
    dark: 'bg-white/[0.02] border-white/5 shadow-md',
    elevated: 'bg-white/10 border-white/20 shadow-xl',
  };
  
  const animationClasses = animated ? 'animate-pulse-glow' : '';
  
  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${animationClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
