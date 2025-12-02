import { Injectable } from '@nestjs/common';
import { DoctorWeeklyScheduleRepository } from 'src/doctor-weekly-schedule/doctor-weekly-schedule.repository';
import { doctorTimeSlotDurationMinutes } from 'src/auth/constants';
import { DayOfTheWeekService } from 'src/common/DayOfTheWeekService';
import moment from 'moment';
import { DoctorTimeSlotRepository } from './doctor-time-slot.repository';
import { UUID } from 'node:crypto';
import { CreateDoctorTimeSlotDto } from './dto/create-doctor-time-slot.dto';

@Injectable()
export class DoctorTimeSlotService {
    constructor(private readonly doctorWeeklyScheduleRepository: DoctorWeeklyScheduleRepository, private readonly dayOfTheWeekService: DayOfTheWeekService, private readonly doctorTimeSlotRepository: DoctorTimeSlotRepository) {

    }
    async generateDoctorAvailabilityTimeSlots() {
        const doctorWeeklySchedules = await this.doctorWeeklyScheduleRepository.findAll();

        let timeSlots = [];
        for (const schedule of doctorWeeklySchedules) {
            if (!timeSlots[schedule.id]) {
                timeSlots[schedule.id] = [];
            }
            const dayOfWeek = schedule.day_of_week;
            const startTime = moment(schedule.start_time, 'HH:mm');
            const endTime = moment(schedule.end_time, 'HH:mm');
            const slotDuration = doctorTimeSlotDurationMinutes;
            const date = this.dayOfTheWeekService.getDateOfTheDay(dayOfWeek);
            console.log('Generating slots for schedule ID:', schedule.id, 'on', date.format('YYYY-MM-DD'));
            
            for (let time = startTime.clone(); time < endTime; time.add(slotDuration, 'minutes')) {
                const slotStart = date.clone().hour(time.hours()).minute(time.minutes());
                const slotEnd = slotStart.clone().add(slotDuration, 'minutes');
                timeSlots[schedule.id].push({
                    'date': date.format('YYYY-MM-DD'),
                    'start_time': slotStart.format('HH:mm'),
                    'end_time': slotEnd.format('HH:mm')
                });
            }
        }
        const insertedDoctorWeeklySchedule = await this.createTimeSlotsForSchedule(timeSlots);
        if (!insertedDoctorWeeklySchedule) {
            throw new Error('Failed to generate doctor availability time slots');
        }
        return insertedDoctorWeeklySchedule;
    }

    async createTimeSlotsForSchedule(timeSlots: Array<{UUID: Array<{ date: string; start_time: string; end_time: string }>}>): Promise<any> {
        return await this.doctorTimeSlotRepository.createBulk(timeSlots);
    }

    update(id: UUID, updateDoctorTimeSlotDto: Partial<CreateDoctorTimeSlotDto>) {
        return this.doctorTimeSlotRepository.update(id, updateDoctorTimeSlotDto);
    }

    findAllByDoctor(doctorId: UUID) {
        return this.doctorTimeSlotRepository.findAllByDoctor(doctorId);
    }

    findAllByDoctorAndDay(doctorId: UUID, dayOfWeek: string) {
        const date = this.dayOfTheWeekService.getDateOfTheDay(dayOfWeek).format('YYYY-MM-DD');
        console.log('Finding slots for doctor ID:', doctorId, 'on', date, 'for day of week:', dayOfWeek);
        return this.doctorTimeSlotRepository.findAllByDoctorAndDay(doctorId, date);
    }

}
