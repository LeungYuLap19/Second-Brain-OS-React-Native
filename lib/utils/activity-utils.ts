import type { Activity } from '@/types';

export const sortActivities = (list: Activity[]): Activity[] =>
  [...list].sort((a, b) => {
    if (!a.startTime && !b.startTime) return 0;
    if (!a.startTime) return -1;
    if (!b.startTime) return 1;
    return a.startTime.localeCompare(b.startTime);
  });

export function categorizeActivities(activities: Activity[]) {
  const urgent: Activity[] = [];
  const allDay: Activity[] = [];
  const scheduled: Activity[] = [];
  const priority: Activity[] = [];

  for (const a of activities) {
    if (a.urgent) urgent.push(a);
    else if (!a.startTime) allDay.push(a);
    else if (a.priority) priority.push(a);
    else scheduled.push(a);
  }

  return { urgent, allDay, scheduled, priority };
}
