import { IsUUID, IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { UUID } from 'node:crypto';
import { DoctorStatus } from '../../Enum/DoctorStatus';

export class CreateDoctorTimeSlotDto {
  @IsNotEmpty()
  @IsUUID()
  schedule_id: UUID;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  start_time: string;

  @IsNotEmpty()
  end_time: string;

  @IsEnum(DoctorStatus)
  status?: DoctorStatus;
}
