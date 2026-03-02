export interface Activity {
  id: string;
  title: string;
  time: string;
  tag?: string;
  notes?: string;
  urgent?: boolean;
  priority?: 'low' | 'medium' | 'high';
  location?: string;
}

export interface MonthDay {
  date: Date;
  isCurrentMonth: boolean;
}

export type MonthMatrix = MonthDay[][];