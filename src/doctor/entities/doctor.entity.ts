import { Specialization } from '../../specialization/entities/specialization.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Doctor {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @OneToOne(() => User, user => user.doctor, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Specialization, specialization => specialization.doctors, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'specialization_id'})
    specialization: Specialization;

    @Column()
    license_number: string;

    @Column()
    years_of_experience: number;

    @Column()
    education: string;

    @Column()
    consultation_fee: number;

    @Column()
    home_visit_fee: number;

    @Column()
    telemedicine_fee: number;

    @Column({ default: false })
    is_verified: boolean;

    @Column({ default: 0 })
    average_rating: number;

    @Column({ default: 0 })
    review_count: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}

