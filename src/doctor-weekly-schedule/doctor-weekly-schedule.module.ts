import { Module } from '@nestjs/common';
import { DoctorWeeklyScheduleService } from './doctor-weekly-schedule.service';
import { DoctorWeeklyScheduleController } from './doctor-weekly-schedule.controller';
import { DoctorWeeklyScheduleRepository } from './doctor-weekly-schedule.repository';
import { DoctorModule } from 'src/doctor/doctor.module';

@Module({
  imports: [DoctorModule],
  controllers: [DoctorWeeklyScheduleController],
  providers: [DoctorWeeklyScheduleService, DoctorWeeklyScheduleRepository],
  exports: [DoctorWeeklyScheduleRepository],
})
export class DoctorWeeklyScheduleModule {}
