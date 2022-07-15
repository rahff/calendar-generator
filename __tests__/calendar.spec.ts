import { Calendar } from '../src/calendar';
import { year } from '../src/data/index';
import { januaryNextYearCalendar, Julycalendar, previousjanuary, septemberCalendar } from '../data/expectations';

describe('Calendar', ()=>{
    let calendar: Calendar;
    beforeEach(()=>{
      const july14Date = new Date(1657776322055)
        calendar = new Calendar(july14Date);
    })

    it('should return calendar of current mounth', ()=>{
        const result = calendar.generateCalendarOfMounth();
        expect(result).toEqual(Julycalendar);
    })

    it('should return calendar of any mounth in future', ()=>{
      const result = calendar.generateCalendarOfMounth(8);
      expect(result).toEqual(septemberCalendar);
    })

    it('should return a mounth in next year', ()=>{
      const result = calendar.generateCalendarOfMounth(0);
      expect(result).toEqual(januaryNextYearCalendar);
    })

    it('should return a paste mounth', ()=>{
      const result = calendar.generateCalendarOfMounth(0, false);
      expect(result).toEqual(previousjanuary);
    })
})