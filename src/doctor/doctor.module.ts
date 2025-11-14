import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { SpecializationModule } from '../specialization/specialization.module';
import { DoctorRepository } from './doctor.repository';

@Module({
  imports: [SpecializationModule],
  controllers: [DoctorController],
  providers: [DoctorService, DoctorRepository],
  exports: [DoctorService, DoctorRepository],
})
export class DoctorModule {}
