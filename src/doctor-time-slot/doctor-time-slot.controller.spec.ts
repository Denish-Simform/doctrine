import { Test, TestingModule } from '@nestjs/testing';
import { DoctorTimeSlotController } from './doctor-time-slot.controller';
import { DoctorTimeSlotService } from './doctor-time-slot.service';

describe('DoctorTimeSlotController', () => {
  let controller: DoctorTimeSlotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorTimeSlotController],
      providers: [DoctorTimeSlotService],
    }).compile();

    controller = module.get<DoctorTimeSlotController>(DoctorTimeSlotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
