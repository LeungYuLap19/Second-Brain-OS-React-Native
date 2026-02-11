export interface Activity {
  id: string;
  title: string;
  time: string;
  tag?: string;
}

export interface MonthDay {
  date: Date;
  isCurrentMonth: boolean;
}

export type MonthMatrix = MonthDay[][];