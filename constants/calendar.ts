import type { Activity } from '@/types';

export const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const activityMap: Record<string, Activity[]> = {
  '2026-02-12': [
    {
      id: 'a1',
      title: 'Review onboarding flow',
      time: '09:30 AM',
      tag: 'Design',
      notes: 'Finalize empty-state behavior and CTA copy before handoff.',
      urgent: false,
      priority: 'medium',
      location: 'Design Studio',
    },
    {
      id: 'a2',
      title: 'Sync with backend team',
      time: '01:00 PM',
      tag: 'Meeting',
      notes: 'Align API payload shape for inbox thread and auth token refresh.',
      urgent: true,
      priority: 'high',
      location: 'Zoom Room A',
    },
    {
      id: 'a7',
      title: 'Sync with backend team',
      time: '01:00 PM',
      tag: 'Meeting',
      notes: 'Capture action items and owners after architecture decisions.',
      urgent: false,
      priority: 'medium',
      location: 'Zoom Room A',
    },
  ],
  '2026-02-04': [
    {
      id: 'a3',
      title: 'Draft launch email',
      time: '10:15 AM',
      tag: 'Marketing',
      notes: 'Prepare two subject-line variants and include personalization token.',
      urgent: false,
      priority: 'medium',
      location: 'Workspace Desk',
    },
  ],
  '2026-02-06': [
    {
      id: 'a4',
      title: 'Ship files UI',
      time: '11:00 AM',
      tag: 'Build',
      notes: 'Validate upload card interactions and error states on iOS + Android.',
      urgent: true,
      priority: 'high',
      location: 'Engineering Pod',
    },
    {
      id: 'a5',
      title: 'Agent demo',
      time: '04:00 PM',
      tag: 'Demo',
      notes: 'Show end-to-end chatroom creation and history persistence flow.',
      urgent: false,
      priority: 'medium',
      location: 'Conference Room 2',
    },
  ],
  '2026-02-10': [
    {
      id: 'a6',
      title: 'Sprint retro',
      time: '03:30 PM',
      tag: 'Team',
      notes: 'Collect blockers, wins, and one process improvement for next sprint.',
      urgent: false,
      priority: 'low',
      location: 'War Room',
    },
  ],
};
