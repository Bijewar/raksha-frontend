/**
 * PremiumSkeleton - Animated skeleton loader with premium styling
 */
export function PremiumSkeleton({ 
  className = '',
  variant = 'default',
  count = 1,
  ...props 
}) {
  const variants = {
    default: 'h-12 w-full rounded-lg',
    card: 'h-64 w-full rounded-lg',
    text: 'h-4 w-3/4 rounded',
    avatar: 'h-12 w-12 rounded-full',
  };
  
  const items = Array.from({ length: count });
  
  return (
    <div className="space-y-4">
      {items.map((_, i) => (
        <div
          key={i}
          className={`${variants[variant]} bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 animate-pulse opacity-50 ${className}`}
          {...props}
        />
      ))}
    </div>
  );
}
