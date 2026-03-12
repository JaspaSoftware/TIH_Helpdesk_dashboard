import { StatCard } from '@/components/StatCard';
import { StatusBadge, PriorityBadge } from '@/components/StatusBadge';
import { mockIssues } from '@/data/mockData';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Inbox,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const stats = [
  { label: 'Open Issues', value: 5, change: 12, trend: 'up' as const, color: 'primary' as const, icon: <Inbox className="h-5 w-5" /> },
  { label: 'In Progress', value: 2, change: 8, trend: 'up' as const, color: 'warning' as const, icon: <Clock className="h-5 w-5" /> },
  { label: 'Resolved Today', value: 3, change: 15, trend: 'up' as const, color: 'success' as const, icon: <CheckCircle2 className="h-5 w-5" /> },
  { label: 'Critical', value: 1, change: 50, trend: 'down' as const, color: 'destructive' as const, icon: <AlertTriangle className="h-5 w-5" /> },
];

const weeklyData = [
  { day: 'Mon', submitted: 8, resolved: 6 },
  { day: 'Tue', submitted: 12, resolved: 10 },
  { day: 'Wed', submitted: 6, resolved: 9 },
  { day: 'Thu', submitted: 10, resolved: 7 },
  { day: 'Fri', submitted: 14, resolved: 12 },
  { day: 'Sat', submitted: 3, resolved: 4 },
  { day: 'Sun', submitted: 2, resolved: 3 },
];

const categoryData = [
  { name: 'Plumbing', value: 25, color: 'hsl(217, 91%, 50%)' },
  { name: 'Electrical', value: 20, color: 'hsl(38, 92%, 50%)' },
  { name: 'HVAC', value: 18, color: 'hsl(152, 60%, 40%)' },
  { name: 'Elevator', value: 12, color: 'hsl(0, 72%, 51%)' },
  { name: 'Other', value: 25, color: 'hsl(215, 20%, 65%)' },
];

const recentIssues = mockIssues.slice(0, 5);

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of facilities management activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} delay={i * 80} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Weekly Chart */}
        <div className="glass-card col-span-2 rounded-lg p-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <h2 className="text-sm font-semibold text-foreground">Weekly Activity</h2>
          <p className="mb-4 text-xs text-muted-foreground">Issues submitted vs resolved</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeklyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 91%)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'hsl(215, 14%, 46%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(215, 14%, 46%)' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(215, 20%, 91%)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="submitted" fill="hsl(217, 91%, 50%)" radius={[4, 4, 0, 0]} name="Submitted" />
              <Bar dataKey="resolved" fill="hsl(152, 60%, 40%)" radius={[4, 4, 0, 0]} name="Resolved" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="glass-card rounded-lg p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h2 className="text-sm font-semibold text-foreground">By Category</h2>
          <p className="mb-2 text-xs text-muted-foreground">Issue distribution</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(215, 20%, 91%)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: cat.color }} />
                  <span className="text-muted-foreground">{cat.name}</span>
                </div>
                <span className="font-medium text-foreground">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Issues */}
      <div className="glass-card rounded-lg animate-fade-in" style={{ animationDelay: '500ms' }}>
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Recent Issues</h2>
            <p className="text-xs text-muted-foreground">Latest reported issues</p>
          </div>
          <Link
            to="/issues"
            className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentIssues.map((issue) => (
            <div
              key={issue.id}
              className="flex items-center justify-between px-6 py-3.5 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="text-xs font-mono text-muted-foreground w-16 shrink-0">{issue.id}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{issue.title}</p>
                  <p className="text-xs text-muted-foreground">{issue.building} · {issue.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <PriorityBadge priority={issue.priority} />
                <StatusBadge status={issue.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
