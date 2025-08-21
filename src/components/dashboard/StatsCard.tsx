import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  subtitle?: string;
  className?: string;
  gradient?: 'primary' | 'success' | 'warning';
  onClick?: () => void;
}

export default function StatsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  subtitle,
  className,
  gradient,
  onClick
}: StatsCardProps) {
  const gradientClasses = {
    primary: 'from-trust-blue-500 to-trust-blue-700',
    success: 'from-success-green to-success-green-light', 
    warning: 'from-alert-orange to-alert-orange-light'
  };

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-card-border shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group",
        gradient && "bg-gradient-to-br text-white",
        gradient && gradientClasses[gradient],
        onClick && "hover:scale-[1.02]",
        className
      )}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className={cn(
              "text-sm font-medium",
              gradient ? "text-white/90" : "text-muted-foreground"
            )}>
              {title}
            </p>
            <p className={cn(
              "text-2xl font-bold mt-1",
              gradient ? "text-white" : "text-foreground"
            )}>
              {value}
            </p>
            {subtitle && (
              <p className={cn(
                "text-sm mt-1",
                gradient ? "text-white/80" : "text-muted-foreground"
              )}>
                {subtitle}
              </p>
            )}
          </div>
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            gradient 
              ? "bg-white/20 text-white" 
              : "bg-neutral-100 text-muted-foreground group-hover:bg-neutral-200 transition-colors"
          )}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        
        {change && (
          <div className="mt-4 flex items-center">
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              changeType === 'positive' && "bg-success-green-bg text-success-green",
              changeType === 'negative' && "bg-red-50 text-red-600",
              changeType === 'neutral' && "bg-neutral-100 text-neutral-600",
              gradient && "bg-white/20 text-white"
            )}>
              {change}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}