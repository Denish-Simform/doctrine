import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { WeekDay } from '../../Enum/WeekDay';
import { UUID } from 'node:crypto';

export class WeeklyScheduleItem {
    @IsEnum(WeekDay)
    day_of_week: WeekDay;

    @IsNotEmpty()
    start_time: string;

    @IsNotEmpty()
    end_time: string;

    is_home_visit?: boolean;
}

export class CreateDoctorWeeklyScheduleDto {
    @IsNotEmpty()
    @IsUUID()
    doctor_id: UUID;

    @IsNotEmpty()
    weekly_schedule: WeeklyScheduleItem[];
}
