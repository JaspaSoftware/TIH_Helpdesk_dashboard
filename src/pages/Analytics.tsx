import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';

const responseTimeData = [
  { week: 'W1', avgHours: 4.2 },
  { week: 'W2', avgHours: 3.8 },
  { week: 'W3', avgHours: 5.1 },
  { week: 'W4', avgHours: 3.2 },
  { week: 'W5', avgHours: 2.9 },
  { week: 'W6', avgHours: 2.5 },
];

const slaData = [
  { month: 'Sep', met: 85, missed: 15 },
  { month: 'Oct', met: 88, missed: 12 },
  { month: 'Nov', met: 91, missed: 9 },
  { month: 'Dec', met: 87, missed: 13 },
  { month: 'Jan', met: 93, missed: 7 },
  { month: 'Feb', met: 95, missed: 5 },
];

const volumeData = [
  { month: 'Sep', volume: 42 },
  { month: 'Oct', volume: 58 },
  { month: 'Nov', volume: 51 },
  { month: 'Dec', volume: 39 },
  { month: 'Jan', volume: 65 },
  { month: 'Feb', volume: 48 },
];

const tooltipStyle = {
  background: 'hsl(0, 0%, 100%)',
  border: '1px solid hsl(215, 20%, 91%)',
  borderRadius: '8px',
  fontSize: '12px',
};

const Analytics = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Performance metrics and trends</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Response Time Trend */}
        <div className="glass-card rounded-lg p-6">
          <h2 className="text-sm font-semibold text-foreground">Avg Response Time</h2>
          <p className="mb-4 text-xs text-muted-foreground">Hours to first response (trending down)</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 91%)" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: 'hsl(215, 14%, 46%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(215, 14%, 46%)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="avgHours" stroke="hsl(217, 91%, 50%)" strokeWidth={2.5} dot={{ fill: 'hsl(217, 91%, 50%)', r: 4 }} name="Avg Hours" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* SLA Compliance */}
        <div className="glass-card rounded-lg p-6">
          <h2 className="text-sm font-semibold text-foreground">SLA Compliance</h2>
          <p className="mb-4 text-xs text-muted-foreground">Percentage of SLAs met vs missed</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={slaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 91%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(215, 14%, 46%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(215, 14%, 46%)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="met" stackId="sla" fill="hsl(152, 60%, 40%)" radius={[0, 0, 0, 0]} name="Met" />
              <Bar dataKey="missed" stackId="sla" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} name="Missed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Issue Volume */}
        <div className="glass-card rounded-lg p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold text-foreground">Issue Volume</h2>
          <p className="mb-4 text-xs text-muted-foreground">Monthly issues reported</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 91%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(215, 14%, 46%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(215, 14%, 46%)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(217, 91%, 50%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(217, 91%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="volume" stroke="hsl(217, 91%, 50%)" strokeWidth={2} fill="url(#areaGrad)" name="Issues" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
