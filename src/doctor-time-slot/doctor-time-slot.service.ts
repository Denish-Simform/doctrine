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
 * Handles the generation, creation, update, and retrieval of time slots
 * for doctor availability based on their weekly schedules.
 */
@Injectable()
export class DoctorTimeSlotService {
  /**
   * Creates an instance of DoctorTimeSlotService.
   * @param doctorWeeklyScheduleRepository - Repository for accessing doctor weekly schedule data
   * @param dayOfTheWeekService - Service for handling day of the week operations
   * @param doctorTimeSlotRepository - Repository for accessing doctor time slot data
   */
  constructor(
    private readonly doctorWeeklyScheduleRepository: DoctorWeeklyScheduleRepository,
    private readonly dayOfTheWeekService: DayOfTheWeekService,
    private readonly doctorTimeSlotRepository: DoctorTimeSlotRepository,
  ) {}
  /**
   * Generates time slots for all doctors based on their weekly schedules.
   * Retrieves all weekly schedules and creates individual time slots
   * for each schedule based on the configured slot duration.
   * @returns Promise resolving to the created time slots
   * @throws Error if time slot generation fails
   */
  async generateDoctorAvailabilityTimeSlots() {
    // Fetch all doctor weekly schedules from the database
    const doctorWeeklySchedules =
      await this.doctorWeeklyScheduleRepository.findAll();

    // Initialize array to store time slots grouped by schedule ID
    const timeSlots = [];
    for (const schedule of doctorWeeklySchedules) {
      // Initialize array for this schedule if not already present
      if (!timeSlots[schedule.id]) {
        timeSlots[schedule.id] = [];
      }
      // Extract schedule details
      const dayOfWeek = schedule.day_of_week;
      const startTime = moment(schedule.start_time, 'HH:mm');
      const endTime = moment(schedule.end_time, 'HH:mm');
      const slotDuration = doctorTimeSlotDurationMinutes;
      // Get the actual date for the day of the week
      const date = this.dayOfTheWeekService.getDateOfTheDay(dayOfWeek);
      console.log(
        'Generating slots for schedule ID:',
        schedule.id,
        'on',
        date.format('YYYY-MM-DD'),
      );

      // Generate individual time slots within the schedule's time range
      for (
        let time = startTime.clone();
        time < endTime;
        time.add(slotDuration, 'minutes')
      ) {
        // Calculate slot start and end times
        const slotStart = date
          .clone()
          .hour(time.hours())
          .minute(time.minutes());
        const slotEnd = slotStart.clone().add(slotDuration, 'minutes');
        // Add the slot to the schedule's slot array
        timeSlots[schedule.id].push({
          date: date.format('YYYY-MM-DD'),
          start_time: slotStart.format('HH:mm'),
          end_time: slotEnd.format('HH:mm'),
        });
      }
    }
    // Persist all generated time slots to the database
    const insertedDoctorWeeklySchedule =
      await this.createTimeSlotsForSchedule(timeSlots);
    if (!insertedDoctorWeeklySchedule) {
      throw new Error('Failed to generate doctor availability time slots');
    }
    return insertedDoctorWeeklySchedule;
  }

  /**
   * Creates time slots in bulk for multiple schedules.
   * @param timeSlots - Array of time slot data grouped by schedule UUID
   * @returns Promise resolving to the created time slot records
   */
  async createTimeSlotsForSchedule(
    timeSlots: Array<{
      UUID: Array<{ date: string; start_time: string; end_time: string }>;
    }>,
  ): Promise<any> {
    return await this.doctorTimeSlotRepository.createBulk(timeSlots);
  }

  /**
   * Updates a specific time slot with new data.
   * @param id - UUID of the time slot to update
   * @param updateDoctorTimeSlotDto - Partial DTO containing fields to update
   * @returns The updated time slot record
   */
  update(id: UUID, updateDoctorTimeSlotDto: Partial<CreateDoctorTimeSlotDto>) {
    return this.doctorTimeSlotRepository.update(id, updateDoctorTimeSlotDto);
  }

  /**
   * Retrieves all time slots for a specific doctor.
   * @param doctorId - UUID of the doctor
   * @returns Promise resolving to an array of time slots for the doctor
   */
  findAllByDoctor(doctorId: UUID) {
    return this.doctorTimeSlotRepository.findAllByDoctor(doctorId);
  }

  /**
   * Retrieves all time slots for a specific doctor on a given day of the week.
   * @param doctorId - UUID of the doctor
   * @param dayOfWeek - Day of the week (e.g., 'Monday', 'Tuesday')
   * @returns Promise resolving to an array of time slots for the doctor on the specified day
   */
  findAllByDoctorAndDay(doctorId: UUID, dayOfWeek: string) {
    // Convert day of week to actual date format
    const date = this.dayOfTheWeekService
      .getDateOfTheDay(dayOfWeek)
      .format('YYYY-MM-DD');
    console.log(
      'Finding slots for doctor ID:',
      doctorId,
      'on',
      date,
      'for day of week:',
      dayOfWeek,
    );
    return this.doctorTimeSlotRepository.findAllByDoctorAndDay(doctorId, date);
  }
}
