import { BaseRepository } from "src/common/BaseRepository";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { DoctorWeeklySchedule } from "./entities/doctor-weekly-schedule.entity";
import { DataSource } from "typeorm";
import { UUID } from "node:crypto";
import { DoctorRepository } from "src/doctor/doctor.repository";

@Injectable()
export class DoctorWeeklyScheduleRepository extends BaseRepository {
    private doctorWeeklyScheduleRepo: Repository<DoctorWeeklySchedule>;
    constructor(dataSource: DataSource, private doctorRepository: DoctorRepository) {
        super();
        this.doctorWeeklyScheduleRepo = dataSource.getRepository(DoctorWeeklySchedule);
    }

    async create(doctorWeeklySchedule: any): Promise<DoctorWeeklySchedule[]> {
        const newDoctorWeeklySchedules = doctorWeeklySchedule.map((schedule: Partial<DoctorWeeklySchedule>) => {
            const newSchedule = new DoctorWeeklySchedule();
            Object.assign(newSchedule, schedule);
            return newSchedule;
        });
        console.log(newDoctorWeeklySchedules);
        return this.doctorWeeklyScheduleRepo.save(newDoctorWeeklySchedules);
    }

    findAll(): Promise<DoctorWeeklySchedule[]> {
        return this.doctorWeeklyScheduleRepo.find({
            relations: ['doctor', 'doctor.user']
        });
    }

    findAllByDoctorId(doctorId: UUID): Promise<DoctorWeeklySchedule[]> {
        return this.doctorWeeklyScheduleRepo.find({
            where: { doctor: { id: doctorId } },
            relations: ['doctor']
        });
    }

    findOne(id: UUID): Promise<DoctorWeeklySchedule | null> {
        return this.doctorWeeklyScheduleRepo.findOneBy({ id: id });
    }

    findOneBy(condition: Partial<DoctorWeeklySchedule>): Promise<DoctorWeeklySchedule | null> {
        return this.doctorWeeklyScheduleRepo.findOneBy(condition);
    }

    update(id: UUID, updateData: any): Promise<DoctorWeeklySchedule[]> {
        console.log('Update Data:', updateData);
        return this.findAllByDoctorId(id).then((doctorWeeklySchedules) => {
            if (!doctorWeeklySchedules) {
                throw new Error('DoctorWeeklySchedules not found');
            }
            const updatedDoctorWeeklySchedule = doctorWeeklySchedules.map((doctorWeeklySchedule, index) => {
                if (doctorWeeklySchedule.day_of_week !== updateData.weekly_schedule[index].day_of_week) {
                    return doctorWeeklySchedule;
                }
                return this.updateEntityRecursively(doctorWeeklySchedule, updateData.weekly_schedule[index]);
            });
            console.log('Updated Doctor Weekly Schedule:', updatedDoctorWeeklySchedule);
            return this.doctorWeeklyScheduleRepo.save(updatedDoctorWeeklySchedule);
        });
    }
}