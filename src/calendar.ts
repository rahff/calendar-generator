import { year, week } from "./data";
import { CalendarData, MounthMetadata } from "./interfaces";

export class Calendar {

    private currentMounth: number;
    private currentDate: number;
    private DayInMilliSecond = 1000 * 60 * 60 * 24;
    private currentYear = new Date().getFullYear();

    constructor(private ctxDate: Date = new Date()){
        this.currentMounth = ctxDate.getMonth();
        this.currentDate = ctxDate.getDate();
    }

    generateCalendarOfMounth(mounthIndex: number = this.currentMounth): CalendarData {
        if(mounthIndex < this.currentMounth) ++ this.currentYear
        const currentMounthMetada = this.getCurrentMonthMetadata(mounthIndex);
        const firstDayOfMounth = new Date(this.currentYear, mounthIndex, 1, 12);
        const weekDayInOrder = week.slice(firstDayOfMounth.getDay()).concat(week.slice(0, firstDayOfMounth.getDay()))
        const calendar: CalendarData = { days: weekDayInOrder, dates: []};
        for (let index = 0; index < currentMounthMetada.days; index++) {
            const dateIndex = new Date(firstDayOfMounth.getTime() + (this.DayInMilliSecond * index))
            calendar.dates.push({date: dateIndex.getUTCDate(), isPassed: this.isPassedDate(dateIndex, mounthIndex) , isToday: this.isToday(dateIndex), day: week[dateIndex.getDay()]})
        }
        return calendar;
    }

    private getCurrentMonthMetadata(mounthIndex: number = this.currentMounth): MounthMetadata {
        return year[mounthIndex]
    }

    private isPassedDate(date: Date, mounthIndex: number): boolean {
        return this.currentDate > date.getDate() && mounthIndex === this.currentMounth ? true : false
    }

    private isToday(date: Date): boolean {
        return date.toDateString() === this.ctxDate.toDateString()
    }
    
}