export const PriorityLevel = {
  URGENT: 'URGENT',
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
} as const;

export type PriorityLevel = (typeof PriorityLevel)[keyof typeof PriorityLevel];

export const PRIORITY_META: Record<
  PriorityLevel,
  { label: string; display: string; color: string }
> = {
  URGENT: { label: 'Urgent', display: 'Priority 1', color: '#dc3545' },
  HIGH: { label: 'High', display: 'Priority 2', color: '#fd7e14' },
  MEDIUM: { label: 'Medium', display: 'Priority 3', color: '#009688' },
  LOW: { label: 'Low', display: 'Priority 4', color: '#6c757d' },
};
