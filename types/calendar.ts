import { Dispatch, SetStateAction } from 'react';

export interface Activity {
  id: string;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  tag?: string;
  notes?: string;
  urgent?: boolean;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  location?: string;
}

export interface MonthDay {
  date: Date;
  isCurrentMonth: boolean;
}

export type MonthMatrix = MonthDay[][];
export type ActivityForm = Omit<Activity, 'id'>;
export type ActivityMap = Record<string, Activity[]>;
export type SetActivities = Dispatch<SetStateAction<ActivityMap>>;
export type Priority = NonNullable<Activity['priority']>;
export type PickerType = 'date' | 'start' | 'end' | null;

export interface ActivityContextValue {
  activities: ActivityMap;
  loading: boolean;
  fetchActivities: (year: number, month: number, options?: { force?: boolean }) => Promise<void>;
  createActivity: (form: ActivityForm) => Promise<Activity>;
  updateActivity: (id: string, form: ActivityForm) => Promise<Activity>;
  deleteActivity: (id: string) => Promise<void>;
  toggleActivityDone: (id: string, completed: boolean) => Promise<void>;
}

