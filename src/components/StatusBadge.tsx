import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const statusVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      status: {
        new: 'bg-info/10 text-info',
        assigned: 'bg-primary/10 text-primary',
        in_progress: 'bg-warning/10 text-warning',
        blocked: 'bg-destructive/10 text-destructive',
        completed: 'bg-success/10 text-success',
        closed: 'bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      status: 'new',
    },
  }
);

const priorityVariants = cva(
  'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wide',
  {
    variants: {
      priority: {
        low: 'bg-muted text-muted-foreground',
        medium: 'bg-warning/10 text-warning',
        high: 'bg-destructive/10 text-destructive',
        critical: 'bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      priority: 'medium',
    },
  }
);

const statusLabels: Record<string, string> = {
  new: 'New',
  assigned: 'Assigned',
  in_progress: 'In Progress',
  blocked: 'Blocked',
  completed: 'Completed',
  closed: 'Closed',
};

const statusDots: Record<string, string> = {
  new: 'bg-info',
  assigned: 'bg-primary',
  in_progress: 'bg-warning',
  blocked: 'bg-destructive',
  completed: 'bg-success',
  closed: 'bg-muted-foreground',
};

interface StatusBadgeProps extends VariantProps<typeof statusVariants> {
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => (
  <span className={cn(statusVariants({ status }), className)}>
    <span className={cn('h-1.5 w-1.5 rounded-full', statusDots[status || 'new'])} />
    {statusLabels[status || 'new']}
  </span>
);

interface PriorityBadgeProps extends VariantProps<typeof priorityVariants> {
  className?: string;
}

export const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => (
  <span className={cn(priorityVariants({ priority }), className)}>
    {priority}
  </span>
);
