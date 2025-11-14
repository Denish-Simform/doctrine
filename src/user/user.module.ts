import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PatientModule } from '../patient/patient.module';
import { DoctorModule } from '../doctor/doctor.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [PatientModule, DoctorModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
