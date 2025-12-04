import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Specialization } from './entities/specialization.entity';
import { Injectable } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { BaseRepository } from 'src/common/BaseRepository';

@Injectable()
export class SpecializationRepository extends BaseRepository {
  private specializationRepo: Repository<Specialization>;
  constructor(dataSource: DataSource) {
    super();
    this.specializationRepo = dataSource.getRepository(Specialization);
  }

  create(specialization: Partial<Specialization>): Promise<Specialization> {
    return this.specializationRepo.save(specialization);
  }

  findAll(): Promise<Specialization[]> {
    return this.specializationRepo.find();
  }

  findOneBy(
    condition: Partial<Specialization>,
  ): Promise<Specialization | null> {
    return this.specializationRepo.findOneBy(condition);
  }

  async update(
    id: UUID,
    updateData: Partial<Specialization>,
  ): Promise<Specialization> {
    const specialization = await this.specializationRepo.findOneBy({ id: id });
    if (!specialization) {
      throw new Error('Specialization not found');
    }

    return this.specializationRepo.save(
      this.updateEntityRecursively(specialization, updateData),
    );
  }

  remove(id: UUID): Promise<DeleteResult> {
    return this.specializationRepo.delete(id);
  }
}
