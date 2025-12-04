import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UpdatePatientDto } from 'src/patient/dto/update-patient.dto';
import { UpdateDoctorDto } from 'src/doctor/dto/update-doctor.dto';
import UserRole from 'src/Enum/UserRole';
import Gender from 'src/Enum/Gender';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // last_name?: string;
  // email?: string;
  // role?: UserRole;
  // password?: string;
  // phone_number?: string;
  // gender? : Gender;
  // date_of_birth?: Date;
  // patient_details?: UpdatePatientDto;
  // doctor_details?: UpdateDoctorDto;
}
