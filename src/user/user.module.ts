import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PatientModule } from '../patient/patient.module';
import { DoctorModule } from '../doctor/doctor.module';
import { UserRepository } from './user.repository';
import { MailModule } from 'src/mail/mail.module';
import { AwsService } from 'src/aws/aws.service';
import { UserImageRepository } from './userImage.repository';

@Module({
  imports: [PatientModule, DoctorModule, MailModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, AwsService, UserImageRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
