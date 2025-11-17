import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { UUID } from 'node:crypto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { bcryptSaltRounds } from 'src/auth/constants';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {

    constructor(private userRepository: UserRepository, private doctorService: DoctorService, private patientService: PatientService, private jwtService: JwtService, private mailService: MailService) {}

    async create(createUserDto: CreateUserDto) : Promise<User> {
        try {
            const passwordHash = await bcrypt.hash(createUserDto.password, bcryptSaltRounds);
            createUserDto.password = passwordHash;
            const user = await this.userRepository.create(createUserDto);

            try {
                if (createUserDto.role === 'doctor' && createUserDto.doctor_details) {
                    await this.doctorService.create(createUserDto.doctor_details, user);
                } else if (createUserDto.role === 'patient' && createUserDto.patient_details) {
                    await this.patientService.create(createUserDto.patient_details, user);
                } else {
                    this.userRepository.countAdminUsers().then(async (count) => {
                        if (count > 1) {
                            throw new Error('Invalid role details for user creation');
                        }
                    });
                }
            } catch (error) {
                await this.userRepository.remove(user.id);
                return Promise.reject(error);
            }

            const token = this.jwtService.sign({ sub: user.id, email: user.email });

            await this.mailService.sendVerificationEmail(user.email, token);

            return user;
        } catch (error) {
            return Promise.reject(error);
        }
        

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
