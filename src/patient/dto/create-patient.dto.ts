import { IsUUID, IsJSON, IsString, IsNotEmpty } from 'class-validator';

export class CreatePatientDto {
  @IsUUID()
  user_id?: string;

  @IsNotEmpty()
  @IsJSON()
  medical_history?: JSON;

  @IsNotEmpty()
  @IsString()
  blood_group: string;

  @IsString()
  @IsNotEmpty()
  emergency_contact: string;
}
