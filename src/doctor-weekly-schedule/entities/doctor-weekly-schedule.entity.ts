import { UUID } from 'node:crypto';
import { Entity, JoinColumn } from 'typeorm';
import { PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { DoctorTimeSlot } from '../../doctor-time-slot/entities/doctor-time-slot.entity';
import { WeekDay } from '../../Enum/WeekDay';

@Entity()
export class DoctorWeeklySchedule {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => Doctor, (doctor) => doctor.weeklySchedule, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @OneToMany(() => DoctorTimeSlot, (time_slots) => time_slots.schedule, {
    cascade: true,
  })
  time_slots: DoctorTimeSlot[];

  @Column({ type: 'enum', enum: WeekDay, unique: true })
  day_of_week: WeekDay;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column({ default: true })
  is_home_visit: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
