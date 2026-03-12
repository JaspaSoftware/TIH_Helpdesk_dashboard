import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Building2, Bell, Shield } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="max-w-3xl space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage system configuration and preferences
        </p>
      </div>

      {/* General */}
      <div className="glass-card rounded-lg p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Building2 className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">General</h2>
        </div>
        <Separator />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Organization Name</Label>
            <Input defaultValue="Acme Properties" className="mt-1.5" />
          </div>
          <div>
            <Label>Support Email</Label>
            <Input defaultValue="support@acmeprops.com" className="mt-1.5" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="glass-card rounded-lg p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-warning" />
          <h2 className="text-sm font-semibold text-foreground">Notifications</h2>
        </div>
        <Separator />
        <div className="space-y-4">
          {[
            { label: 'Email notifications for new issues', defaultChecked: true },
            { label: 'Push notifications for critical issues', defaultChecked: true },
            { label: 'Daily summary digest', defaultChecked: false },
            { label: 'SLA breach alerts', defaultChecked: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{item.label}</span>
              <Switch defaultChecked={item.defaultChecked} />
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="glass-card rounded-lg p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-success" />
          <h2 className="text-sm font-semibold text-foreground">Security</h2>
        </div>
        <Separator />
        <div className="space-y-4">
          {[
            { label: 'Two-factor authentication', defaultChecked: false },
            { label: 'Session timeout after 30 minutes', defaultChecked: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{item.label}</span>
              <Switch defaultChecked={item.defaultChecked} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Reset</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
