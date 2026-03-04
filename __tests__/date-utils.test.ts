import {
    formatDateKey,
    getMonthMatrix,
    getWeekDays,
    isSameDay,
    startOfWeek,
} from '@/lib/utils/date-utils';

// ── formatDateKey ──────────────────────────────────────────────────

describe('formatDateKey', () => {
  it('formats a date as YYYY-MM-DD', () => {
    expect(formatDateKey(new Date(2026, 2, 4))).toBe('2026-03-04');
  });

  it('zero-pads single-digit month and day', () => {
    expect(formatDateKey(new Date(2026, 0, 5))).toBe('2026-01-05');
  });

  it('handles December 31', () => {
    expect(formatDateKey(new Date(2025, 11, 31))).toBe('2025-12-31');
  });
});

// ── isSameDay ──────────────────────────────────────────────────────

describe('isSameDay', () => {
  it('returns true for the same calendar day', () => {
    const a = new Date(2026, 2, 4, 9, 0);
    const b = new Date(2026, 2, 4, 23, 59);
    expect(isSameDay(a, b)).toBe(true);
  });

  it('returns false for different days', () => {
    const a = new Date(2026, 2, 4);
    const b = new Date(2026, 2, 5);
    expect(isSameDay(a, b)).toBe(false);
  });

  it('returns false for same day/month but different year', () => {
    const a = new Date(2025, 2, 4);
    const b = new Date(2026, 2, 4);
    expect(isSameDay(a, b)).toBe(false);
  });
});

// ── startOfWeek ────────────────────────────────────────────────────

describe('startOfWeek', () => {
  it('returns the preceding Monday for a Wednesday', () => {
    // 2026-03-04 is a Wednesday
    const wed = new Date(2026, 2, 4, 15, 30);
    const monday = startOfWeek(wed);
    expect(monday.getDay()).toBe(1); // Monday
    expect(monday.getDate()).toBe(2);
    expect(monday.getHours()).toBe(0);
  });

  it('returns the same day when given a Monday', () => {
    const mon = new Date(2026, 2, 2);
    const result = startOfWeek(mon);
    expect(result.getDate()).toBe(2);
    expect(result.getDay()).toBe(1);
  });

  it('returns the preceding Monday for a Sunday', () => {
    // 2026-03-08 is Sunday
    const sun = new Date(2026, 2, 8);
    const result = startOfWeek(sun);
    expect(result.getDay()).toBe(1); // Monday
    expect(result.getDate()).toBe(2);
  });
});

// ── getWeekDays ────────────────────────────────────────────────────

describe('getWeekDays', () => {
  it('returns exactly 7 days', () => {
    const days = getWeekDays(new Date(2026, 2, 4));
    expect(days).toHaveLength(7);
  });

  it('starts on Monday and ends on Sunday', () => {
    const days = getWeekDays(new Date(2026, 2, 4));
    expect(days[0].getDay()).toBe(1); // Monday
    expect(days[6].getDay()).toBe(0); // Sunday
  });

  it('days are consecutive', () => {
    const days = getWeekDays(new Date(2026, 2, 4));
    for (let i = 1; i < days.length; i++) {
      const diff = days[i].getDate() - days[i - 1].getDate();
      // Handle month boundary: diff is 1 normally, or negative at month rollover
      expect(Math.abs(diff) === 1 || Math.abs(diff) > 20).toBe(true);
    }
  });
});

// ── getMonthMatrix ─────────────────────────────────────────────────

describe('getMonthMatrix', () => {
  it('returns between 4 and 6 weeks', () => {
    const matrix = getMonthMatrix(new Date(2026, 2, 1)); // March 2026
    expect(matrix.length).toBeGreaterThanOrEqual(4);
    expect(matrix.length).toBeLessThanOrEqual(6);
  });

  it('each week has exactly 7 days', () => {
    const matrix = getMonthMatrix(new Date(2026, 2, 1));
    matrix.forEach((week) => {
      expect(week).toHaveLength(7);
    });
  });

  it('marks days in the target month with isCurrentMonth = true', () => {
    const matrix = getMonthMatrix(new Date(2026, 2, 1)); // March
    const allDays = matrix.flat();
    const marchDays = allDays.filter((d) => d.isCurrentMonth);
    expect(marchDays.length).toBe(31); // March has 31 days
  });

  it('marks days outside the target month with isCurrentMonth = false', () => {
    const matrix = getMonthMatrix(new Date(2026, 1, 1)); // February 2026
    const allDays = matrix.flat();
    const outsideDays = allDays.filter((d) => !d.isCurrentMonth);
    // Feb 2026 has 28 days, matrix fills out remaining cells with adjacent months
    expect(outsideDays.length).toBeGreaterThan(0);
  });

  it('first week starts on Monday', () => {
    const matrix = getMonthMatrix(new Date(2026, 2, 1));
    expect(matrix[0][0].date.getDay()).toBe(1); // Monday
  });
});
