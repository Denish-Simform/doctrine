import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UUID } from 'node:crypto';
import UserRole from 'src/Enum/UserRole';
import { BaseRepository } from 'src/common/BaseRepository';

@Injectable()
export class UserRepository extends BaseRepository {
  private userRepo: Repository<User>;
  constructor(dataSource: DataSource) {
    super();
    this.userRepo = dataSource.getRepository(User);
  }

  create(user: Partial<User>): Promise<User> {
    const newUser = new User();
    Object.assign(newUser, user);
    return this.userRepo.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find({
      relations: ['doctor', 'patient', 'image'],
    });
  }

  findOne(id: UUID): Promise<User | null> {
    return this.userRepo.findOne({
      where: { id: id },
      relations: ['doctor', 'patient', 'image'],
    });
  }

  async update(id: UUID, updateData: Partial<User>): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id: id },
      relations: ['doctor', 'patient', 'image'],
    });
    if (!user) {
      throw new Error('User not found');
    }
    return this.userRepo.save(this.updateEntityRecursively(user, updateData));
  }

  async remove(id: UUID): Promise<void> {
    await this.userRepo.delete(id);
  }

  findOneBy(condition: Partial<User>): Promise<User | null> {
    return this.userRepo.findOneBy(condition);
  }

  updateVerifiedEmail(id: UUID, isVerified: boolean): Promise<boolean> {
    return this.userRepo
      .update(id, { is_verified: isVerified })
      .then(() => true)
      .catch(() => false);
  }

  findAllPaginated(page: number, limit: number): Promise<User[]> {
    const skip = (page - 1) * limit;
    return this.userRepo.find({
      skip: skip,
      take: limit,
      relations: ['doctor', 'patient', 'image'],
    });
  }

  countUsers(role?: UserRole): Promise<number> {
    if (role) {
      return this.userRepo.count({ where: { role: role } });
    }

    return this.userRepo.count();
  }
}
