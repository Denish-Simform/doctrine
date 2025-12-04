import { Injectable } from '@nestjs/common';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { SpecializationRepository } from './specialization.repository';
import { UUID } from 'node:crypto';

@Injectable()
export class SpecializationService {
  constructor(
    private readonly specializationRepository: SpecializationRepository,
  ) {}

  create(createSpecializationDto: CreateSpecializationDto) {
    return this.specializationRepository.create(createSpecializationDto);
  }

  findAll() {
    return this.specializationRepository.findAll();
  }

  findOne(id: UUID) {
    return this.specializationRepository.findOneBy({ id: id });
  }

  update(id: UUID, updateSpecializationDto: UpdateSpecializationDto) {
    return this.specializationRepository.update(id, updateSpecializationDto);
  }

  remove(id: UUID) {
    return this.specializationRepository.remove(id);
  }
}
