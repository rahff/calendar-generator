import { year, week } from "./data";
import { CalendarData, DateMetatada, MounthMetadata } from "./interfaces";

export class Calendar {
  private currentDate: number | null = null;
  private DayInMilliSecond = 1000 * 60 * 60 * 24;
  private week = week;
  private year = year;

  constructor(private ctxDate: Date | null = null) {
    if (this.ctxDate) {
      this.currentDate = this.ctxDate.getDate();
    }
  }

  public generateCalendarOfMounth(
    mounthIndex: number,
    year: number
  ): CalendarData {
    const currentMounthMetada = this.getCurrentMonthMetadata(mounthIndex);
    const firstDayOfMounth = new Date(year, mounthIndex, 1, 12);
    const weekDayInOrder = this.week
      .slice(firstDayOfMounth.getDay())
      .concat(this.week.slice(0, firstDayOfMounth.getDay()));
    const calendar: CalendarData = {
      days: weekDayInOrder,
      dates: [],
      currentmounth: {
        stringFormat: this.year[currentMounthMetada.index].name,
        numberFormat: currentMounthMetada.index,
      },
      currentYear: year,
    };
    for (let index = 0; index < currentMounthMetada.days; index++) {
      const dateIndex = new Date(
        firstDayOfMounth.getTime() + this.DayInMilliSecond * index
      );
      calendar.dates.push(this.getDateMetadata(dateIndex, mounthIndex));
    }
    return calendar;
  }

  private getCurrentMonthMetadata(mounthIndex: number): MounthMetadata {
    return this.year[mounthIndex];
  }

  private isPassedDate(date: Date, mounthIndex: number): boolean {
    const dateRef = this.currentDate ? this.currentDate : null;
    if (dateRef) {
      return dateRef > date.getDate() && mounthIndex === new Date().getMonth()
        ? true
        : false;
    } else {
      return new Date().getDate() > date.getDate() &&
        mounthIndex === new Date().getMonth()
        ? true
        : false;
    }
  }

  private isToday(date: Date): boolean {
    const dateRef = this.ctxDate ? this.ctxDate : null;
    if (dateRef) {
      return date.toDateString() === dateRef.toDateString();
    } else {
      return date.toDateString() === new Date().toDateString();
    }
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
    return mounthIndex < 10
      ? "0" + this.year[mounthIndex].index.toString()
      : this.year[--mounthIndex].index.toString();
  }
}
