import { UUID } from 'node:crypto';
import { User } from '../../user/entities/user.entity';
import {
  Entity,
  OneToOne,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @OneToOne(() => User, (user) => user.patient, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'jsonb', nullable: true })
  medical_history: JSON;

  @Column()
  blood_group: string;

  @Column()
  emergency_contact: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
