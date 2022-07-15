export interface MounthMetadata {
  name: string;
  short: string;
  index: number;
  days: number;
}

export interface CalendarData {
  days: string[];
  dates: DateMetatada[];
}

export interface DateMetatada {
  date: number;
  isPassed: boolean;
  isToday: boolean;
  day: string;
  mounth: string;
  dateISOString: string;
}
