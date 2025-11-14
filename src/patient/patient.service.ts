import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { User } from '../user/entities/user.entity';
import { PatientRepository } from './patient.repository';
import { UUID } from 'node:crypto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
    constructor(private patientRepository: PatientRepository) {}

    async create(createPatientDto: CreatePatientDto, user: User) : Promise<Patient> {
        return await this.patientRepository.create(createPatientDto, user);
    }

    findAll() : Promise<Patient[] | null> {
        return this.patientRepository.findAll();
    }

    findOne(id: UUID): Promise<Patient | null> {
        return this.patientRepository.findOneBy({ id : id });
    }
}
