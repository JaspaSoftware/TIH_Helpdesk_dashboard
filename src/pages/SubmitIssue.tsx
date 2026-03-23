import { useState } from 'react';
import { categories, buildings } from '@/data/mockData';
import type { Priority } from '@/types/helpdesk';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SubmitIssue = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    priority: '' as Priority | '',
    building: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: 'Issue submitted',
      description: 'Your issue has been logged and assigned ticket ID ISS-009.',
    });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
        <div className="rounded-full bg-success/10 p-4 mb-4">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Issue Submitted Successfully</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Ticket <span className="font-mono font-semibold text-foreground">ISS-009</span> has been created.
        </p>
        <p className="text-sm text-muted-foreground">You'll receive updates as it progresses.</p>
        <Button className="mt-6" onClick={() => setSubmitted(false)}>
          Submit Another Issue
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Submit an Issue</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Report a facilities issue and we'll get it resolved
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card rounded-lg p-6 space-y-5">
          <div>
            <Label htmlFor="title">Issue Title</Label>
            <Input
              id="title"
              placeholder="Brief description of the issue"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide details about the issue..."
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              className="mt-1.5"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Priority</Label>
              <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v as Priority })}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label>Building</Label>
              <Select value={form.building} onValueChange={(v) => setForm({ ...form, building: v })}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select building" />
                </SelectTrigger>
                <SelectContent>
                  {buildings.map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Location / Room</Label>
              <Input
                id="location"
                placeholder="e.g. Floor 2, Room M45"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="mt-1.5"
              />
            </div>
          </div>

          {/* Photo upload area */}
          <div>
            <Label>Attachments</Label>
            <div className="mt-1.5 flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 transition-colors hover:border-primary/30 hover:bg-muted/50 cursor-pointer">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Drop photos here or <span className="text-primary font-medium">browse</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit">Submit Issue</Button>
        </div>
      </form>
    </div>
  );
};

export default SubmitIssue;
