import { IsUUID, IsJSON, IsString } from "class-validator";

export class CreatePatientDto {
    @IsUUID()
    user_id?: string;

    @IsJSON()
    medical_history: JSON;

    @IsString()
    blood_group: string;

    @IsString()
    emergency_contact: string;
}
