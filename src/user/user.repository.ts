import { DataSource, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { Injectable } from "@nestjs/common";
import { UUID } from "node:crypto";
import UserRole from "src/Enum/UserRole";

@Injectable()
export class UserRepository {
    private userRepo: Repository<User>;
    constructor(dataSource: DataSource) {
        this.userRepo = dataSource.getRepository(User);
    }

    create(user: Partial<User>): Promise<User> {
        const newUser = new User();
        Object.assign(newUser, user);
        return this.userRepo.save(newUser);
    }

    findAll(): Promise<User[]> {
        return this.userRepo.find({
            relations: ['doctor', 'patient'],
        });
    }

    findOne(id: UUID): Promise<User | null> {
        return this.userRepo.findOneBy({ id : id });
    }

    async update(id: UUID, user: Partial<User>): Promise<User> {
        let updatedUser = await this.userRepo.findOne({
                where : { id : id } ,
                relations: ['doctor', 'patient'],
            }
        );
        if (!updatedUser) {
            throw new Error('User not found');
        }
        if (user.patient) {
            for (const key in user.patient) {
                updatedUser.patient[key] = user.patient[key];
            }
        } else if (user.doctor) {
            for (const key in user.doctor) {
                updatedUser.doctor[key] = user.doctor[key];
            }
        }
        return this.userRepo.save(updatedUser);
    }

    async remove(id: UUID): Promise<void> {
        await this.userRepo.delete(id);
    }

    findOneBy(condition: Partial<User>): Promise<User | null> {
        return this.userRepo.findOneBy(condition);
    }

    updateVerifiedEmail(id: UUID, isVerified: boolean): Promise<boolean> {
        return this.userRepo.update(id, { is_verified: isVerified }).then(() => true).catch(() => false);
    }

    countAdminUsers(): Promise<number> {
        return this.userRepo.count({ where: { role: UserRole.ADMIN } });
    }
}