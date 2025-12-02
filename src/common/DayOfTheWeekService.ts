import { Injectable } from '@nestjs/common';
import moment from 'moment';
import { weekDays } from 'src/auth/constants';

@Injectable()
export class DayOfTheWeekService {
    getDateOfTheDay(day: string): moment.Moment {
        const dayIndex = weekDays.indexOf(day) + 1;
        if (dayIndex === -1) {
            throw new Error('Invalid day of the week');
        }
        const date = moment().day(7 + dayIndex);

        return date;
    }
}
