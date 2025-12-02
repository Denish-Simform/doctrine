import { DataSource, Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { Specialization } from '../specialization/entities/specialization.entity';

@Injectable()
export class DoctorRepository {
  private doctorRepo: Repository<Doctor>;
  constructor(dataSource: DataSource) {
    this.doctorRepo = dataSource.getRepository(Doctor);
  }

  create(
    doctor: Partial<Doctor>,
    user: User,
    specialization: Specialization,
  ): Promise<Doctor> {
    const newDoctor = new Doctor();
    Object.assign(newDoctor, doctor);
    newDoctor.user = user;
    newDoctor.specialization = specialization;
    return this.doctorRepo.save(newDoctor);
  }

  findAll(): Promise<Doctor[]> {
    return this.doctorRepo.find({
      relations: ['user', 'specialization'],
    });
  }

  findOneBy(condition: Partial<Doctor>): Promise<Doctor | null> {
    return this.doctorRepo.findOne({
      where: condition,
      relations: ['user', 'specialization'],
    });
  }
}
