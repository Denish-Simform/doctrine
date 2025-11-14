import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorRepository } from './doctor.repository';
import { SpecializationRepository } from '../specialization/specialization.repository';
import { User } from '../user/entities/user.entity';
import { UUID } from 'node:crypto';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
    constructor(private doctorRepository: DoctorRepository, private specializationRepository: SpecializationRepository) {}

    async create(createDoctorDto: CreateDoctorDto, user: User) {
        const specialization = await this.specializationRepository.findOneBy({ id: createDoctorDto.specialization_id.toString() });
        if (!specialization) {
            throw new Error('Specialization not found');
        }
        return this.doctorRepository.create(createDoctorDto, user, specialization);
    }

    findAll() {
        return this.doctorRepository.findAll();
    }

    findOne(id: UUID) : Promise<Doctor | null> {
        return this.doctorRepository.findOneBy({ id : id });
    }
}
