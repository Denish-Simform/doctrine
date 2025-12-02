import { Entity, JoinColumn } from 'typeorm';
import { UUID } from 'node:crypto';
import { PrimaryGeneratedColumn, OneToOne, ManyToOne, Column } from 'typeorm';
import { DoctorWeeklySchedule } from '../../doctor-weekly-schedule/entities/doctor-weekly-schedule.entity';
import { DoctorStatus } from '../../Enum/DoctorStatus';
import { Transform } from 'class-transformer';

@Entity()
export class DoctorTimeSlot {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @ManyToOne(() => DoctorWeeklySchedule, (schedule) => schedule.time_slots, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'schedule_id'})
    schedule: DoctorWeeklySchedule;

    @Column({ type: 'date' })
    @Transform(({ value }) => value.toISOString().split('T')[0], { toPlainOnly: true })
    date: string;

    @Column({ type: 'time' })
    start_time: string;

    @Column({ type: 'time' })
    end_time: string;

    @Column({ type: 'enum', enum: DoctorStatus, default: DoctorStatus.AVAILABLE })
    status: DoctorStatus;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
