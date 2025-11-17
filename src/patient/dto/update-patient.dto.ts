import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
    // medical_history?: JSON;

    // blood_group?: string;

    // emergency_contact?: string;
}
