import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorWeeklyScheduleDto } from './create-doctor-weekly-schedule.dto';

export class UpdateDoctorWeeklyScheduleDto extends PartialType(
  CreateDoctorWeeklyScheduleDto,
) {}
