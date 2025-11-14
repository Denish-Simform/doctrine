import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    IsNotEmpty,
    Matches,
    IsEnum,
    IsDateString
 } from 'class-validator';
import Gender from '../../Enum/Gender';
import UserRole from '../../Enum/UserRole';
import { CreateDoctorDto } from '../../doctor/dto/create-doctor.dto';
import { CreatePatientDto } from '../../patient/dto/create-patient.dto';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(30)
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(30)
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message: 'Password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @IsEnum(UserRole)
    @IsNotEmpty()
    role: UserRole;

    @IsEnum(Gender)
    @IsNotEmpty()   
    gender: Gender;

    @IsDateString()
    @IsNotEmpty()
    date_of_birth: Date;

    doctor_details?: CreateDoctorDto | any;

    patient_details?: CreatePatientDto | any;
}
