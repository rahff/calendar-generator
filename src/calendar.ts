import { year, week } from "./data";
import { CalendarData, DateMetatada, MounthMetadata } from "./interfaces";

export class Calendar {
  private currentMounth: number = 1;
  private currentDate: number = 1;
  private DayInMilliSecond = 1000 * 60 * 60 * 24;
  private currentYear = new Date().getFullYear();
  private week = week;
  private year = year;

  constructor(private ctxDate: Date = new Date()) {
    this.timeInitialization(ctxDate);
  }

  public getCurrentMounth(): number {
    return this.currentMounth;
  }

  public getCurrentDate(): number {
    return this.currentDate;
  }

  public generateCalendarOfMounth(
    mounthIndex: number = this.currentMounth,
    forFuture: boolean = true
  ): CalendarData {
    this.timeInitialization(this.ctxDate);
    if (mounthIndex < this.currentMounth && forFuture) ++this.currentYear;
    const currentMounthMetada = this.getCurrentMonthMetadata(mounthIndex);
    const firstDayOfMounth = new Date(this.currentYear, mounthIndex, 1, 12);
    const weekDayInOrder = this.week
      .slice(firstDayOfMounth.getDay())
      .concat(this.week.slice(0, firstDayOfMounth.getDay()));
      const calendar: CalendarData = { 
        days: weekDayInOrder, dates: [], 
        currentmounth: {
          stringFormat: this.year[currentMounthMetada.index].name, 
          numberFormat: currentMounthMetada.index
        },
        currentYear: this.currentYear
      };
      for (let index = 0; index < currentMounthMetada.days; index++) {
      const dateIndex = new Date(
        firstDayOfMounth.getTime() + this.DayInMilliSecond * index
      );
      calendar.dates.push(this.getDateMetadata(dateIndex, mounthIndex));
    }
    return calendar;
  }

  private timeInitialization(providedDate: Date = new Date()): void {
    this.ctxDate = providedDate;
    this.currentMounth = this.ctxDate.getMonth();
    this.currentDate = this.ctxDate.getDate();
    this.currentYear = this.ctxDate.getFullYear();
  }

  private getCurrentMonthMetadata(
    mounthIndex: number = this.currentMounth
  ): MounthMetadata {
    return this.year[mounthIndex];
  }

  private isPassedDate(date: Date, mounthIndex: number): boolean {
    return this.currentDate > date.getDate() &&
      mounthIndex === this.currentMounth
      ? true
      : false;
  }

  private isToday(date: Date): boolean {
    return date.toDateString() === this.ctxDate.toDateString();
  }

  private getDateMetadata(date: Date, mounthIndex: number): DateMetatada {
    return {
      date: date.getUTCDate(),
      isPassed: this.isPassedDate(date, mounthIndex),
      isToday: this.isToday(date),
      day: this.week[date.getDay()],
      dateISOString: date.toISOString(),
      mounth: this.getIndexMounthToString(mounthIndex),
    };
  }

  private getIndexMounthToString(mounthIndex: number): string {
    ++mounthIndex;
    return mounthIndex < 10 ? "0" + this.year[mounthIndex].index.toString() : this.year[mounthIndex].index.toString();
  }
}
