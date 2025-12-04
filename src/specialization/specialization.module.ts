import { Module } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { SpecializationController } from './specialization.controller';
import { SpecializationRepository } from './specialization.repository';

@Module({
  controllers: [SpecializationController],
  providers: [SpecializationService, SpecializationRepository],
  exports: [SpecializationService, SpecializationRepository],
})
export class SpecializationModule {}
