import { Injectable } from '@nestjs/common';
import { CreateDoctorWeeklyScheduleDto } from './dto/create-doctor-weekly-schedule.dto';
import { DoctorWeeklyScheduleRepository } from './doctor-weekly-schedule.repository';
import { DoctorRepository } from 'src/doctor/doctor.repository';
import { UUID } from 'node:crypto';

@Injectable()
export class DoctorWeeklyScheduleService {
  constructor(
    private readonly doctorWeeklyScheduleRepository: DoctorWeeklyScheduleRepository,
    private readonly doctorRepository: DoctorRepository,
  ) {}

  async create(createDoctorWeeklyScheduleDto: CreateDoctorWeeklyScheduleDto) {
    const doctor = await this.doctorRepository.findOneBy({
      id: createDoctorWeeklyScheduleDto.doctor_id,
    });
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    const insertedDoctorWeeklySchedule =
      createDoctorWeeklyScheduleDto.weekly_schedule.map((dto) => {
        return { doctor: doctor, ...dto };
      });
    return this.doctorWeeklyScheduleRepository.create(
      insertedDoctorWeeklySchedule,
    );
  }

  findAllForDoctor(id: UUID) {
    return this.doctorWeeklyScheduleRepository.findAllByDoctorId(id);
  }

  update(id: UUID, updateDoctorWeeklyScheduleDto: any) {
    return this.doctorWeeklyScheduleRepository.update(
      id,
      updateDoctorWeeklyScheduleDto,
    );
  }
}
