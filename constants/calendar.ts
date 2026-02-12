import type { Activity } from '@/types';

export const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const activityMap: Record<string, Activity[]> = {
  '2026-02-12': [
    { id: 'a1', title: 'Review onboarding flow', time: '09:30 AM', tag: 'Design' },
    { id: 'a2', title: 'Sync with backend team', time: '01:00 PM', tag: 'Meeting' },
    { id: 'a7', title: 'Sync with backend team', time: '01:00 PM', tag: 'Meeting' },
  ],
  '2026-02-04': [
    { id: 'a3', title: 'Draft launch email', time: '10:15 AM', tag: 'Marketing' },
  ],
  '2026-02-06': [
    { id: 'a4', title: 'Ship files UI', time: '11:00 AM', tag: 'Build' },
    { id: 'a5', title: 'Agent demo', time: '04:00 PM', tag: 'Demo' },
  ],
  '2026-02-10': [
    { id: 'a6', title: 'Sprint retro', time: '03:30 PM', tag: 'Team' },
  ],
};
