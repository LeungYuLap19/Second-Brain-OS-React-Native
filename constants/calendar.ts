import type { ActivityMap } from '@/types';

export const PRIORITY_OPTIONS = ['low', 'medium', 'high'] as const;

export const getPriorityStyles = (priority: string | undefined): { bg: string, border: string, icon: string } => {
  switch (priority) {
    case 'high': return { bg: 'bg-rose-500/20', border: 'border border-rose-500/50', icon: '#fb7185' };
    case 'medium': return { bg: 'bg-amber-500/20', border: 'border border-amber-500/50', icon: '#fbbf24' };
    case 'low': return { bg: 'bg-emerald-500/20', border: 'border border-emerald-500/50', icon: '#34d399' };
    default: return { bg: 'bg-zinc-800', border: 'border border-zinc-700', icon: '#52525b' };
  }
};

export const calendarTheme = {
  backgroundColor: 'transparent',
  calendarBackground: 'transparent',
  monthTextColor: '#e4e4e7',
  dayTextColor: '#a1a1aa',
  textDisabledColor: '#3f3f46',
  todayTextColor: '#e4e4e7',
  todayBackgroundColor: '#27272a',
  selectedDayBackgroundColor: '#f4f4f5',
  selectedDayTextColor: '#18181b',
  dotColor: '#6366f1',
  selectedDotColor: '#6366f1',
  arrowColor: '#71717a',
  textDayFontWeight: '500' as const,
  textDayHeaderFontWeight: '500' as const,
  textDayFontSize: 14,
  textDayHeaderFontSize: 10,
  textMonthFontSize: 0,
  textMonthFontWeight: '600' as const,
  weekVerticalMargin: 12,
  'stylesheet.calendar.header': {
    header: { height: 0 },
    monthText: { display: 'none' as const },
    dayHeader: {
      color: '#71717a',
      fontSize: 10,
      fontWeight: '500' as const,
      textTransform: 'uppercase' as const,
      letterSpacing: 1,
      marginBottom: 4,
    },
  },
};

export const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const activityMap: ActivityMap = {
  '2026-02-12': [
    {
      id: 'a1',
      title: 'Review onboarding flow',
      date: '2026-02-12',
      startTime: '09:30',
      endTime: '10:30',
      tag: 'Design',
      notes: 'Finalize empty-state behavior and CTA copy before handoff.',
      urgent: false,
      completed: false,
      priority: 'medium',
      location: 'Design Studio',
    },
    {
      id: 'a2',
      title: 'Sync with backend team',
      date: '2026-02-12',
      startTime: '13:00',
      endTime: '14:00',
      tag: 'Meeting',
      notes: 'Align API payload shape for inbox thread and auth token refresh.',
      urgent: true,
      completed: true,
      priority: 'high',
      location: 'Zoom Room A',
    },
    {
      id: 'a7',
      title: 'Sync with backend team',
      date: '2026-02-12',
      startTime: '13:00',
      endTime: '14:00',
      tag: 'Meeting',
      notes: 'Capture action items and owners after architecture decisions.',
      urgent: false,
      completed: false,
      priority: 'medium',
      location: 'Zoom Room A',
    },
  ],
  '2026-02-04': [
    {
      id: 'a3',
      title: 'Draft launch email',
      date: '2026-02-04',
      startTime: '10:15',
      endTime: '11:15',
      tag: 'Marketing',
      notes: 'Prepare two subject-line variants and include personalization token.',
      urgent: false,
      completed: false,
      priority: 'medium',
      location: 'Workspace Desk',
    },
  ],
  '2026-02-06': [
    {
      id: 'a4',
      title: 'Ship files UI',
      date: '2026-02-06',
      startTime: '11:00',
      endTime: '12:00',
      tag: 'Build',
      notes: 'Validate upload card interactions and error states on iOS + Android.',
      urgent: true,
      completed: false,
      priority: 'high',
      location: 'Engineering Pod',
    },
    {
      id: 'a5',
      title: 'Agent demo',
      date: '2026-02-06',
      startTime: '16:00',
      endTime: '17:00',
      tag: 'Demo',
      notes: 'Show end-to-end chatroom creation and history persistence flow.',
      urgent: false,
      completed: true,
      priority: 'medium',
      location: 'Conference Room 2',
    },
  ],
  '2026-02-10': [
    {
      id: 'a6',
      title: 'Sprint retro',
      date: '2026-02-10',
      startTime: '15:30',
      endTime: '16:30',
      tag: 'Team',
      notes: 'Collect blockers, wins, and one process improvement for next sprint.',
      urgent: false,
      completed: false,
      priority: 'low',
      location: 'War Room',
    },
  ],
};
