import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
    medical_history?: JSON | any;

    blood_group?: string;

    emergency_contact?: string;
}
