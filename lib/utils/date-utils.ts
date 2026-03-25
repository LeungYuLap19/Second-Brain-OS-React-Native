import { monthNames } from '@/constants/calendar';
import type { Activity, MonthDay, MonthMatrix } from '@/types';

const pad = (value: number) => String(value).padStart(2, '0');

export const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return `${year}-${month}-${day}`;
};

export const isSameDay = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

export const startOfWeek = (date: Date) => {
  const dayIndex = (date.getDay() + 6) % 7;
  const start = new Date(date);
  start.setDate(date.getDate() - dayIndex);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const getWeekDays = (date: Date) => {
  const start = startOfWeek(date);
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });
};

export const getMonthMatrix = (date: Date): MonthMatrix => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const start = startOfWeek(firstOfMonth);
  const weeks: MonthDay[][] = [];
  let cursor = new Date(start);

  for (let weekIndex = 0; weekIndex < 6; weekIndex += 1) {
    const week: MonthDay[] = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      week.push({
        date: new Date(cursor),
        isCurrentMonth: cursor.getMonth() === month,
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    const weekHasCurrentMonthDay = week.some((day) => day.isCurrentMonth);
    if (weekHasCurrentMonthDay) {
      weeks.push(week);
    } else if (weeks.length > 0) {
      break;
    }
  }

  return weeks;
};

export const shiftDateByMonth = (date: Date, delta: 1 | -1) => {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
};

export const shiftDateByDays = (date: Date, delta: number) => {
  const next = new Date(date);
  next.setDate(date.getDate() + delta);
  return next;
};

export const formatRangeLabel = (days: Date[]) => {
  const start = days[0];
  const end = days[6];
  return `${monthNames[start.getMonth()]} ${start.getDate()} - ${monthNames[end.getMonth()]} ${end.getDate()}`;
};

export const getMonthActivityCount = (activities: Record<string, Activity[]>, monthDate: Date) => {
  const targetMonth = monthDate.getMonth();
  const targetYear = monthDate.getFullYear();
  return Object.entries(activities).reduce((acc, [key, list]) => {
    const date = new Date(key);
    if (date.getMonth() === targetMonth && date.getFullYear() === targetYear) {
      return acc + (list?.length ?? 0);
    }
    return acc;
  }, 0);
};

export const countWeekActivities = (days: Date[], activities: Record<string, Activity[]>) => {
  return days.reduce((acc, value) => {
    const key = formatDateKey(value);
    return acc + (activities[key]?.length ?? 0);
  }, 0);
};

export const timeStringToDate = (time?: string): Date | undefined => {
  if (!time) return undefined;
  const [h, m] = time.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m);
  return d;
};

export const dateToTimeString = (d: Date): string => {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

export const formatTime = (time: string): string => {
  const [h, m] = time.split(':');
  return `${h}:${m}`;
};

export const dateToDateString = (d: Date): string => {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const dateStringToDate = (s?: string): Date => {
  if (!s) return new Date();
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};
