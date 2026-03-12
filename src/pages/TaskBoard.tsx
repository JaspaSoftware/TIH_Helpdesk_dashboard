import { mockIssues } from '@/data/mockData';
import { StatusBadge, PriorityBadge } from '@/components/StatusBadge';
import type { IssueStatus } from '@/types/helpdesk';

const columns: { status: IssueStatus; label: string }[] = [
  { status: 'new', label: 'New' },
  { status: 'assigned', label: 'Assigned' },
  { status: 'in_progress', label: 'In Progress' },
  { status: 'completed', label: 'Completed' },
];

const TaskBoard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Task Board</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Drag and manage maintenance tasks
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((col) => {
          const tasks = mockIssues.filter((i) => i.status === col.status);
          return (
            <div key={col.status} className="rounded-lg bg-muted/30 p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <StatusBadge status={col.status} />
                  <span className="text-xs text-muted-foreground font-medium">{tasks.length}</span>
                </div>
              </div>
              <div className="space-y-2.5">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="glass-card rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono text-muted-foreground">{task.id}</span>
                      <PriorityBadge priority={task.priority} />
                    </div>
                    <p className="text-sm font-medium text-foreground leading-snug">{task.title}</p>
                    <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{task.building}</span>
                      {task.assignedTo && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                          {task.assignedTo.split(' ').map((n) => n[0]).join('')}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {tasks.length === 0 && (
                  <div className="rounded-lg border-2 border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskBoard;
