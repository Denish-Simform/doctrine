import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';
import { UUID } from 'node:crypto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
    // specialization_id?: UUID;

    // license_number?: string;

    // years_of_experience?: number;

    // education?: string;

    // consultation_fee?: number;

    // home_visit_fee?: number;

    // telemedicine_fee?: number;

    // average_rating?: number;

    // review_count?: number;
}
