import type { MonthDay, MonthMatrix } from '@/types';

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
