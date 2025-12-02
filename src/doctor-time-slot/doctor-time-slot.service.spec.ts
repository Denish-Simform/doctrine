import { Test, TestingModule } from '@nestjs/testing';
import { DoctorTimeSlotService } from './doctor-time-slot.service';

describe('DoctorTimeSlotService', () => {
  let service: DoctorTimeSlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorTimeSlotService],
    }).compile();

    service = module.get<DoctorTimeSlotService>(DoctorTimeSlotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
