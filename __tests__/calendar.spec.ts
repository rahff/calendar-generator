import { Calendar } from '../src/calendar';
import { decemberCalendar, januaryNextYearCalendar, Julycalendar, previousjanuary, septemberCalendar } from '../data/expectations';


describe('Calendar arg constructor', ()=>{
    let calendar: Calendar;
    beforeEach(()=>{
      const july14Date = new Date(1657776322055)
        calendar = new Calendar(july14Date);
    })

    it('should return calendar of current mounth', ()=>{
        const result = calendar.generateCalendarOfMounth(6, 2022);
        expect(result).toEqual(Julycalendar);
    })

    it('should return calendar of any mounth in future', ()=>{
      const result = calendar.generateCalendarOfMounth(8, 2022);
      expect(result).toEqual(septemberCalendar);
    })

    it('should return a mounth in next year', ()=>{
      const result = calendar.generateCalendarOfMounth(0, 2023);
      expect(result).toEqual(januaryNextYearCalendar);
    })

    it('should return a mounth in next year', ()=>{
      const result = calendar.generateCalendarOfMounth(11, 2022);
      expect(result).toEqual(decemberCalendar);
    })

    it('should return a paste mounth', ()=>{
      const result = calendar.generateCalendarOfMounth(0, 2022);
      expect(result).toEqual(previousjanuary);
    })
})
