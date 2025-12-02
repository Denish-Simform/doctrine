import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GenerateDoctorAvailabilityTimeSlotsCommand } from 'src/command/generate-doctor-availability-time-slots';

@Injectable()
export class TaskSchedulerService {
    constructor(private readonly generateDoctorAvailabilityTimeSlotsCommand: GenerateDoctorAvailabilityTimeSlotsCommand) { }

    @Cron(CronExpression.EVERY_WEEKEND)
    async handleGenerateDoctorAvailabilityTimeSlots() {
        await this.generateDoctorAvailabilityTimeSlotsCommand.run([], {});
    }
}
