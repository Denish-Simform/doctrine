import { Repository } from "typeorm";
import { DoctorTimeSlot } from "./entities/doctor-time-slot.entity";
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { DoctorWeeklyScheduleRepository } from "src/doctor-weekly-schedule/doctor-weekly-schedule.repository";
import { UUID } from "node:crypto";

@Injectable()
export class DoctorTimeSlotRepository {
    private doctorTimeSlotRepo: Repository<DoctorTimeSlot>;
    constructor(dataSource: DataSource, private readonly doctorWeeklyScheduleRepository: DoctorWeeklyScheduleRepository) {
        this.doctorTimeSlotRepo = dataSource.getRepository(DoctorTimeSlot);
    }

    async create(doctorTimeSlots: Partial<DoctorTimeSlot>[]): Promise<DoctorTimeSlot[]> {
        const newDoctorTimeSlots = doctorTimeSlots.map((slot) => {
            const newSlot = new DoctorTimeSlot();
            Object.assign(newSlot, slot);
            return newSlot;
        });
        return this.doctorTimeSlotRepo.save(newDoctorTimeSlots);
    }

    async createBulk(doctorTimeSlots: any): Promise<DoctorTimeSlot[]> {
        const newDoctorTimeSlots: DoctorTimeSlot[] = [];
        for (const [scheduleId, slots] of Object.entries(doctorTimeSlots)) {
            const weeklySchedule = await this.doctorWeeklyScheduleRepository.findOne(scheduleId as UUID);
            
            if (!weeklySchedule) {
                throw new Error(`Weekly Schedule not found for ID: ${scheduleId}`);
            }
            
            for (const slot of slots as any[]) {
                const newSlot = new DoctorTimeSlot();
                Object.assign(newSlot, slot);
                newSlot.schedule = weeklySchedule;
                newDoctorTimeSlots.push(newSlot);
            }
        }
        
        return this.doctorTimeSlotRepo.save(newDoctorTimeSlots);
    }

    update(id: UUID, updateData: Partial<DoctorTimeSlot>): Promise<DoctorTimeSlot> {
        return this.doctorTimeSlotRepo.findOneBy({ id: id }).then((timeSlot) => {
            if (!timeSlot) {
                throw new Error('Doctor Time Slot not found');
            }
            Object.assign(timeSlot, updateData);
            return this.doctorTimeSlotRepo.save(timeSlot);
        });
    }

    findAllByDoctor(doctorId: UUID): Promise<DoctorTimeSlot[]> {
        return this.doctorTimeSlotRepo.createQueryBuilder('time_slot')
            .select('time_slot.*')
            .leftJoin('doctor_weekly_schedule', 'schedule', 'time_slot.schedule_id = schedule.id')
            .where('schedule.doctor_id = :doctorId', { doctorId }).getRawMany();
    }

    findAllByDoctorAndDay(doctorId: UUID, date: string): Promise<DoctorTimeSlot[]> {
        return this.doctorTimeSlotRepo.createQueryBuilder('time_slot')
            .select('time_slot.date, time_slot.start_time, time_slot.end_time, time_slot.id, time_slot.status, time_slot.schedule_id')
            .leftJoin('doctor_weekly_schedule', 'schedule', 'time_slot.schedule_id = schedule.id')
            .where('schedule.doctor_id = :doctorId', { doctorId })
            .andWhere('time_slot.date = :date', { date })
            .getRawMany();
    }
}