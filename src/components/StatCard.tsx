import { cn } from '@/lib/utils';
import type { StatCard as StatCardType } from '@/types/helpdesk';
import { TrendingUp, TrendingDown } from 'lucide-react';

const colorMap = {
  primary: 'border-l-primary',
  success: 'border-l-success',
  warning: 'border-l-warning',
  destructive: 'border-l-destructive',
  info: 'border-l-info',
};

const iconColorMap = {
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  destructive: 'text-destructive',
  info: 'text-info',
};

interface Props extends StatCardType {
  icon: React.ReactNode;
  delay?: number;
}

export const StatCard = ({ label, value, change, trend, color, icon, delay = 0 }: Props) => (
  <div
    className={cn(
      'glass-card rounded-lg border-l-4 p-5 animate-fade-in',
      colorMap[color]
    )}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-card-foreground animate-count-up">
          {value}
        </p>
      </div>
      <div className={cn('rounded-lg bg-muted p-2.5', iconColorMap[color])}>
        {icon}
      </div>
    </div>
    {change !== undefined && (
      <div className="mt-3 flex items-center gap-1 text-xs">
        {trend === 'up' ? (
          <TrendingUp className="h-3.5 w-3.5 text-success" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5 text-destructive" />
        )}
        <span className={trend === 'up' ? 'text-success' : 'text-destructive'}>
          {change}%
        </span>
        <span className="text-muted-foreground">vs last week</span>
      </div>
    )}
  </div>
);
