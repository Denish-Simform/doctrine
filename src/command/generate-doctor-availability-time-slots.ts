import { Command, CommandRunner } from 'nest-commander';
import { DoctorTimeSlotService } from 'src/doctor-time-slot/doctor-time-slot.service';

@Command({
  name: 'generate-doctor-availability-time-slots',
  description:
    'Generate doctor availability time slots based on weekly schedules',
})
export class GenerateDoctorAvailabilityTimeSlotsCommand extends CommandRunner {
  constructor(private readonly doctorTimeSlotService: DoctorTimeSlotService) {
    super();
  }

  async run(
    passedParam: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    console.log('Generating doctor availability time slots...');
    await this.doctorTimeSlotService.generateDoctorAvailabilityTimeSlots();
    console.log('Doctor availability time slots generation completed.');
  }
}
