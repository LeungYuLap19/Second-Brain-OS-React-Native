import {
    countWeekActivities,
    formatRangeLabel,
    getMonthActivityCount,
    getWeekDays,
    shiftDateByDays,
    shiftDateByMonth,
} from '@/lib/utils/date-utils';
import { getMarkdownStyles } from '@/lib/utils/markdown-styles';
import type { Activity } from '@/types';

// ── shiftDateByMonth ───────────────────────────────────────────────

describe('shiftDateByMonth', () => {
  it('moves forward one month', () => {
    const result = shiftDateByMonth(new Date(2026, 0, 15), 1); // Jan → Feb
    expect(result.getMonth()).toBe(1);
    expect(result.getFullYear()).toBe(2026);
    expect(result.getDate()).toBe(1); // always 1st of the new month
  });

  it('moves backward one month', () => {
    const result = shiftDateByMonth(new Date(2026, 5, 10), -1); // Jun → May
    expect(result.getMonth()).toBe(4);
  });

  it('rolls year forward from December', () => {
    const result = shiftDateByMonth(new Date(2026, 11, 1), 1); // Dec → Jan next year
    expect(result.getMonth()).toBe(0);
    expect(result.getFullYear()).toBe(2027);
  });

  it('rolls year backward from January', () => {
    const result = shiftDateByMonth(new Date(2026, 0, 1), -1); // Jan → Dec previous year
    expect(result.getMonth()).toBe(11);
    expect(result.getFullYear()).toBe(2025);
  });
});

// ── shiftDateByDays ────────────────────────────────────────────────

describe('shiftDateByDays', () => {
  it('shifts forward by positive delta', () => {
    const result = shiftDateByDays(new Date(2026, 2, 1), 5);
    expect(result.getDate()).toBe(6);
  });

  it('shifts backward by negative delta', () => {
    const result = shiftDateByDays(new Date(2026, 2, 10), -3);
    expect(result.getDate()).toBe(7);
  });

  it('crosses month boundary', () => {
    const result = shiftDateByDays(new Date(2026, 1, 28), 3); // Feb 28 + 3
    expect(result.getMonth()).toBe(2); // March
    expect(result.getDate()).toBe(3);
  });

  it('does not mutate the original date', () => {
    const original = new Date(2026, 2, 4);
    const originalTime = original.getTime();
    shiftDateByDays(original, 10);
    expect(original.getTime()).toBe(originalTime);
  });
});

// ── formatRangeLabel ───────────────────────────────────────────────

describe('formatRangeLabel', () => {
  it('formats a week range within the same month', () => {
    // Mon Mar 2 – Sun Mar 8, 2026
    const days = getWeekDays(new Date(2026, 2, 4));
    const label = formatRangeLabel(days);
    expect(label).toBe('Mar 2 - Mar 8');
  });

  it('formats a week range spanning two months', () => {
    // Mon Feb 23 – Sun Mar 1, 2026
    const days = getWeekDays(new Date(2026, 1, 27));
    const label = formatRangeLabel(days);
    expect(label).toBe('Feb 23 - Mar 1');
  });
});

// ── countWeekActivities ────────────────────────────────────────────

describe('countWeekActivities', () => {
  const makeActivity = (id: string): Activity => ({
    id,
    title: 'Test',
    time: '09:00',
    tag: 'Work',
    notes: '',
    urgent: false,
    priority: 'low',
  });

  it('sums activities across all days in the week', () => {
    const days = getWeekDays(new Date(2026, 2, 4)); // Mar 2-8
    const activities: Record<string, Activity[]> = {
      '2026-03-02': [makeActivity('1')],
      '2026-03-04': [makeActivity('2'), makeActivity('3')],
    };
    expect(countWeekActivities(days, activities)).toBe(3);
  });

  it('returns 0 when no activities match', () => {
    const days = getWeekDays(new Date(2026, 2, 4));
    expect(countWeekActivities(days, {})).toBe(0);
  });

  it('ignores activities on days outside the week', () => {
    const days = getWeekDays(new Date(2026, 2, 4)); // Mar 2-8
    const activities: Record<string, Activity[]> = {
      '2026-03-10': [makeActivity('1')], // outside this week
    };
    expect(countWeekActivities(days, activities)).toBe(0);
  });
});

// ── getMonthActivityCount ──────────────────────────────────────────

describe('getMonthActivityCount', () => {
  const makeActivity = (id: string): Activity => ({
    id,
    title: 'Test',
    time: '09:00',
    tag: 'Work',
    notes: '',
    urgent: false,
    priority: 'low',
  });

  it('counts activities only in the target month', () => {
    const activities: Record<string, Activity[]> = {
      '2026-03-01': [makeActivity('1'), makeActivity('2')],
      '2026-03-15': [makeActivity('3')],
      '2026-04-01': [makeActivity('4')], // different month
    };
    const count = getMonthActivityCount(activities, new Date(2026, 2, 1));
    expect(count).toBe(3);
  });

  it('returns 0 for empty activities', () => {
    expect(getMonthActivityCount({}, new Date(2026, 2, 1))).toBe(0);
  });
});

// ── getMarkdownStyles ──────────────────────────────────────────────

describe('getMarkdownStyles', () => {
  it('returns light text color for dark mode', () => {
    const styles = getMarkdownStyles(true);
    expect(styles.body.color).toBe('#ffffff');
  });

  it('returns dark text color for light mode', () => {
    const styles = getMarkdownStyles(false);
    expect(styles.body.color).toBe('#111827');
  });

  it('returns different code background per theme', () => {
    const dark = getMarkdownStyles(true);
    const light = getMarkdownStyles(false);
    expect(dark.code_inline.backgroundColor).not.toBe(light.code_inline.backgroundColor);
  });
});
