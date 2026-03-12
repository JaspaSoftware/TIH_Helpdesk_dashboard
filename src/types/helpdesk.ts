export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type IssueStatus = 'new' | 'assigned' | 'in_progress' | 'blocked' | 'completed' | 'closed';
export type UserRole = 'tenant' | 'maintenance' | 'admin';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: Priority;
  status: IssueStatus;
  location: string;
  building: string;
  reportedBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  images?: string[];
  resolution?: string;
  feedback?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface StatCard {
  label: string;
  value: number;
  change?: number;
  trend?: 'up' | 'down';
  color: 'primary' | 'success' | 'warning' | 'destructive' | 'info';
}
