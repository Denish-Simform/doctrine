import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { UUID } from 'node:crypto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

    constructor(private userRepository: UserRepository, private doctorService: DoctorService, private patientService: PatientService) {}

    async create(createUserDto: CreateUserDto) : Promise<User> {
        const user = await this.userRepository.create(createUserDto);

        if (createUserDto.role === 'doctor' && createUserDto.doctor_details) {
            await this.doctorService.create(createUserDto.doctor_details, user);
        } else if (createUserDto.role === 'patient' && createUserDto.patient_details) {
            await this.patientService.create(createUserDto.patient_details, user);
        }

        return user;
    }

    findAll() : Promise<User[] | null> {
        return this.userRepository.findAll();
    }

    findOne(id: UUID) : Promise<User | null> {
        return this.userRepository.findOne(id);
    }

    async update(id: UUID, updateUserDto: UpdateUserDto) : Promise<User> {
        return await this.userRepository.update(id, updateUserDto);
    }

    remove(id: UUID) : Promise<void> {
        return this.userRepository.remove(id);
    }
}
