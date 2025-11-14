import { DataSource, Repository } from "typeorm";
import { Specialization } from "./entities/specialization.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SpecializationRepository {
    private specializationRepo: Repository<Specialization>;
    constructor(dataSource: DataSource) {
        this.specializationRepo = dataSource.getRepository(Specialization);
    }

    create(specialization: Partial<Specialization>): Promise<Specialization> {
        return this.specializationRepo.save(specialization);
    }

    findAll(): Promise<Specialization[]> {
        return this.specializationRepo.find();
    }

    findOneBy(condition: Partial<Specialization>): Promise<Specialization | null> {
        return this.specializationRepo.findOneBy(condition);
    }
}
