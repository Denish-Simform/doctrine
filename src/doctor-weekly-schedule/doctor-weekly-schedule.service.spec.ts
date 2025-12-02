import { Test, TestingModule } from '@nestjs/testing';
import { DoctorWeeklyScheduleService } from './doctor-weekly-schedule.service';

describe('DoctorWeeklyScheduleService', () => {
  let service: DoctorWeeklyScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorWeeklyScheduleService],
    }).compile();

    service = module.get<DoctorWeeklyScheduleService>(
      DoctorWeeklyScheduleService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
