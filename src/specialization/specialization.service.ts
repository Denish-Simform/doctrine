import { Injectable } from '@nestjs/common';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { SpecializationRepository } from './specialization.repository';

@Injectable()
export class SpecializationService {

    constructor(private readonly specializationRepository: SpecializationRepository) {}

    create(createSpecializationDto: CreateSpecializationDto) {
        return this.specializationRepository.create(createSpecializationDto);
    }

    findAll() {
        return this.specializationRepository.findAll();
    }

    findOne(id: number) {
        return `This action returns a #${id} specialization`;
    }

    update(id: number, updateSpecializationDto: UpdateSpecializationDto) {
        return `This action updates a #${id} specialization`;
    }

    remove(id: number) {
        return `This action removes a #${id} specialization`;
    }
}
