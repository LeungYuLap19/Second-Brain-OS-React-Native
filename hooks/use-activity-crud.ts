import { calendarApi } from '@/lib/api/calendar';
import { getErrorMessage } from '@/lib/api/client';
import { Activity, ActivityForm, SetActivities } from '@/types';
import { useCallback, useRef, useState } from 'react';

export function useActivityCrud(setActivities: SetActivities) {
  const [loading, setLoading] = useState(false);
  const lastFetchRef = useRef<string | null>(null);

  const fetchActivities = useCallback(async (
    year: number,
    month: number,
    { force = false }: { force?: boolean } = {},
  ) => {
    const key = `${year}-${month}`;
    if (!force && lastFetchRef.current === key) return;

    setLoading(true);
    try {
      const data = await calendarApi.getActivitiesByMonth(year, month);
      setActivities(data);
      lastFetchRef.current = key;
    } catch (error: unknown) {
      console.error('Failed to fetch activities:', getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [setActivities]);

  const createActivity = useCallback(async (form: ActivityForm): Promise<Activity> => {
    const created = await calendarApi.createActivity(form);
    setActivities((prev) => {
      const dateKey = created.date;
      const existing = prev[dateKey] ?? [];
      return { ...prev, [dateKey]: [...existing, created] };
    });
    return created;
  }, [setActivities]);

  const updateActivity = useCallback(async (id: string, form: ActivityForm): Promise<Activity> => {
    const updated = await calendarApi.updateActivity(id, form);
    setActivities((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(next)) {
        next[key] = next[key].filter((a) => a.id !== id);
        if (next[key].length === 0) delete next[key];
      }
      const dateKey = updated.date;
      next[dateKey] = [...(next[dateKey] ?? []), updated];
      return next;
    });
    return updated;
  }, [setActivities]);

  const deleteActivity = useCallback(async (id: string): Promise<void> => {
    await calendarApi.deleteActivity(id);
    setActivities((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(next)) {
        next[key] = next[key].filter((a) => a.id !== id);
        if (next[key].length === 0) delete next[key];
      }
      return next;
    });
  }, [setActivities]);

  const toggleActivityDone = useCallback(async (id: string, completed: boolean): Promise<void> => {
    await calendarApi.toggleActivityDone(id, completed);
    setActivities((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(next)) {
        next[key] = next[key].map((a) =>
          a.id === id ? { ...a, completed } : a
        );
      }
      return next;
    });
  }, [setActivities]);

  return { 
    loading, 
    fetchActivities, 
    createActivity, 
    updateActivity, 
    deleteActivity, 
    toggleActivityDone 
  };
}
