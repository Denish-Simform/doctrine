import { Test, TestingModule } from '@nestjs/testing';
import { DoctorWeeklyScheduleController } from './doctor-weekly-schedule.controller';
import { DoctorWeeklyScheduleService } from './doctor-weekly-schedule.service';

describe('DoctorWeeklyScheduleController', () => {
  let controller: DoctorWeeklyScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorWeeklyScheduleController],
      providers: [DoctorWeeklyScheduleService],
    }).compile();

    controller = module.get<DoctorWeeklyScheduleController>(
      DoctorWeeklyScheduleController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
