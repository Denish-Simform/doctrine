import { DataSource, Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PatientRepository {
  private patientRepo: Repository<Patient>;
  constructor(dataSource: DataSource) {
    this.patientRepo = dataSource.getRepository(Patient);
  }

  create(patient: Partial<Patient>, user: User): Promise<Patient> {
    const newPatient = new Patient();
    Object.assign(newPatient, patient);
    newPatient.user = user;
    return this.patientRepo.save(newPatient);
  }

  findAll(): Promise<Patient[]> {
    return this.patientRepo.find({
      relations: ['user'],
    });
  }

  findOneBy(condition: Partial<Patient>): Promise<Patient | null> {
    return this.patientRepo.findOne({
      where: condition,
      relations: ['user'],
    });
  }
}
