import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorTimeSlotDto } from './create-doctor-time-slot.dto';

export class UpdateDoctorTimeSlotDto extends PartialType(
  CreateDoctorTimeSlotDto,
) {}
