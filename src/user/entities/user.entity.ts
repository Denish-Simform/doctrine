import { Doctor } from '../../doctor/entities/doctor.entity';
import Gender from '../../Enum/Gender';
import UserRole from '../../Enum/UserRole';
import { Patient } from '../../patient/entities/patient.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UUID } from 'node:crypto';
import { UserImage } from './userImages.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ name: 'first_name' })
  first_name: string;

  @Column({ name: 'last_name' })
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone_number: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.PATIENT })
  role: UserRole;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({ default: false })
  is_verified: boolean;

  @OneToOne(() => Doctor, (doctor) => doctor.user, {
    onUpdate: 'CASCADE',
    cascade: true,
    onDelete: 'CASCADE',
  })
  doctor: Doctor;

  @OneToOne(() => Patient, (patient) => patient.user, {
    onUpdate: 'CASCADE',
    cascade: true,
    onDelete: 'CASCADE',
  })
  patient: Patient;

  @OneToOne(() => UserImage, (image) => image.user, { cascade: true })
  image: UserImage;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
