import { Module } from '@nestjs/common';
import { DoctorTimeSlotService } from './doctor-time-slot.service';
import { DoctorTimeSlotController } from './doctor-time-slot.controller';
import { DoctorTimeSlotRepository } from './doctor-time-slot.repository';
import { DoctorWeeklyScheduleModule } from 'src/doctor-weekly-schedule/doctor-weekly-schedule.module';
import { DayOfTheWeekService } from 'src/common/DayOfTheWeekService';

@Module({
  imports: [DoctorWeeklyScheduleModule],
  controllers: [DoctorTimeSlotController],
  providers: [
    DoctorTimeSlotService,
    DayOfTheWeekService,
    DoctorTimeSlotRepository,
  ],
  exports: [DoctorTimeSlotService],
})
export class DoctorTimeSlotModule {}
