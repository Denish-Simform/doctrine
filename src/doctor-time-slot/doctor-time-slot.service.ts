import { Injectable } from '@nestjs/common';
import { DoctorWeeklyScheduleRepository } from 'src/doctor-weekly-schedule/doctor-weekly-schedule.repository';
import { doctorTimeSlotDurationMinutes } from 'src/auth/constants';
import { DayOfTheWeekService } from 'src/common/DayOfTheWeekService';
import moment from 'moment';
import { DoctorTimeSlotRepository } from './doctor-time-slot.repository';
import { UUID } from 'node:crypto';
import { CreateDoctorTimeSlotDto } from './dto/create-doctor-time-slot.dto';

/**
 * Service responsible for managing doctor time slots.
 * Handles the generation, creation, updating, and retrieval of time slots
 * that represent a doctor's availability for appointments.
 */
@Injectable()
export class DoctorTimeSlotService {
    /**
     * Creates an instance of DoctorTimeSlotService.
     * @param doctorWeeklyScheduleRepository - Repository for accessing doctor weekly schedules
     * @param dayOfTheWeekService - Service for handling day of the week calculations
     * @param doctorTimeSlotRepository - Repository for accessing doctor time slots
     */
    constructor(private readonly doctorWeeklyScheduleRepository: DoctorWeeklyScheduleRepository, private readonly dayOfTheWeekService: DayOfTheWeekService, private readonly doctorTimeSlotRepository: DoctorTimeSlotRepository) {

    }
    /**
     * Generates time slots for all doctors based on their weekly schedules.
     * Iterates through all doctor weekly schedules and creates individual time slots
     * with a fixed duration defined by doctorTimeSlotDurationMinutes constant.
     *
     * @returns Promise resolving to the created time slots
     * @throws Error if the time slot creation fails
     */
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

    /**
     * Persists multiple time slots to the database in bulk.
     *
     * @param timeSlots - Array of time slot objects grouped by schedule UUID,
     *                    each containing date, start_time, and end_time
     * @returns Promise resolving to the created time slots
     */
    async createTimeSlotsForSchedule(timeSlots: Array<{UUID: Array<{ date: string; start_time: string; end_time: string }>}>): Promise<any> {
        return await this.doctorTimeSlotRepository.createBulk(timeSlots);
    }

    /**
     * Updates an existing doctor time slot with new data.
     *
     * @param id - The unique identifier (UUID) of the time slot to update
     * @param updateDoctorTimeSlotDto - Partial DTO containing fields to update
     * @returns Promise resolving to the updated time slot
     */
    update(id: UUID, updateDoctorTimeSlotDto: Partial<CreateDoctorTimeSlotDto>) {
        return this.doctorTimeSlotRepository.update(id, updateDoctorTimeSlotDto);
    }

    /**
     * Retrieves all time slots for a specific doctor.
     *
     * @param doctorId - The unique identifier (UUID) of the doctor
     * @returns Promise resolving to an array of time slots for the specified doctor
     */
    findAllByDoctor(doctorId: UUID) {
        return this.doctorTimeSlotRepository.findAllByDoctor(doctorId);
    }

    /**
     * Retrieves all time slots for a specific doctor on a given day of the week.
     * Converts the day of week name to a specific date and queries the repository.
     *
     * @param doctorId - The unique identifier (UUID) of the doctor
     * @param dayOfWeek - The day of the week (e.g., 'monday', 'tuesday')
     * @returns Promise resolving to an array of time slots for the specified doctor and day
     */
    findAllByDoctorAndDay(doctorId: UUID, dayOfWeek: string) {
        const date = this.dayOfTheWeekService.getDateOfTheDay(dayOfWeek).format('YYYY-MM-DD');
        console.log('Finding slots for doctor ID:', doctorId, 'on', date, 'for day of week:', dayOfWeek);
        return this.doctorTimeSlotRepository.findAllByDoctorAndDay(doctorId, date);
    }

}
