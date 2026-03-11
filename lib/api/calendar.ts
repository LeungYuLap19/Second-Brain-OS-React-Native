import { Activity, ActivityForm, ActivityMap } from "@/types";
import { getCurrentUser } from "../auth";
import { supabase } from "../utils/supabase";
import { Tables } from "@/types/supabase";

function rowToActivity(row: Tables<'activities'>): Activity {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    startTime: row.start_time ?? undefined,
    endTime: row.end_time ?? undefined,
    tag: row.tag ?? undefined,
    notes: row.notes ?? undefined,
    urgent: row.urgent ?? undefined,
    completed: row.completed,
    priority: row.priority ?? undefined,
    location: row.location ?? undefined,
  };
}

export const calendarApi = {
  getActivitiesByMonth: async (year: number, month: number): Promise<ActivityMap> => {
    const user = await getCurrentUser();

    const from = `${year}-${String(month).padStart(2, '0')}-01`;
    const nextYear  = month === 12 ? year + 1 : year;
    const nextMonth = month === 12 ? 1 : month + 1;
    const to = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;

    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', from)
      .lt('date', to)
      .order('date')
      .order('start_time', { nullsFirst: false });

    if (error) throw error;
    
    return (data ?? []).reduce<ActivityMap>((activities, row) => {
      (activities[row.date] ??= []).push(rowToActivity(row));
      return activities;
    }, {});
  },

  createActivity: async (form: ActivityForm): Promise<Activity> => {
    const user = await getCurrentUser();

    const { data, error } = await supabase
      .from('activities')
      .insert({
        user_id: user.id,
        title: form.title,
        date: form.date,
        start_time: form.startTime ?? null,
        end_time: form.endTime ?? null,
        tag: form.tag ?? null,
        notes: form.notes ?? null,
        urgent: form.urgent ?? null,
        completed: form.completed ?? false,
        priority: form.priority ?? null,
        location: form.location ?? null,
      })
      .select()
      .single();

    if (error) throw error;
    return rowToActivity(data);
  },
  
  updateActivity: async (id: string, form: ActivityForm): Promise<Activity> => {
    const { data, error } = await supabase
      .from('activities')
      .update({
        title: form.title,
        date: form.date,
        start_time: form.startTime ?? null,
        end_time: form.endTime ?? null,
        tag: form.tag ?? null,
        notes: form.notes ?? null,
        urgent: form.urgent ?? null,
        completed: form.completed ?? false,
        priority: form.priority ?? null,
        location: form.location ?? null,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return rowToActivity(data);
  },

  // TODO: Create getActivityById(id: string) to fetch a single activity by its ID.

  deleteActivity: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  toggleActivityDone: async (id: string, completed: boolean): Promise<void> => {
    const { error } = await supabase
      .from('activities')
      .update({ completed })
      .eq('id', id);

    if (error) throw error;
  },
}