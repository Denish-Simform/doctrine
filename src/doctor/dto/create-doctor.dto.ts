import { IsString, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class CreateDoctorDto {
    @IsUUID()
    user_id?: string;

    @IsUUID()
    specialization_id: string;

    @IsString()
    @IsNotEmpty()
    license_number: string;

    @IsNumber()
    @IsNotEmpty()
    years_of_experience: number;

    @IsString()
    @IsNotEmpty()
    education: string;

    @IsNumber()
    @IsNotEmpty()
    consultation_fee: number;

    @IsNumber()
    @IsNotEmpty()
    home_visit_fee: number;

    @IsNumber()
    @IsNotEmpty()
    telemedicine_fee: number;

    @IsNumber()
    average_rating?: number;

    @IsNumber()
    review_count?: number;
}
