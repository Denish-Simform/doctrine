import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { DoctorWeeklyScheduleService } from './doctor-weekly-schedule.service';
import { CreateDoctorWeeklyScheduleDto } from './dto/create-doctor-weekly-schedule.dto';
import { UpdateDoctorWeeklyScheduleDto } from './dto/update-doctor-weekly-schedule.dto';
import { Roles } from 'src/decorators/roles.decorator';
import UserRole from 'src/Enum/UserRole';
import { DoctorWeeklyScheduleInterceptor } from './interceptor/doctor-weekly-schedule.interceptor';
import { UUID } from 'node:crypto';

@Controller('doctor-weekly-schedule')
@Roles([UserRole.ADMIN, UserRole.DOCTOR])
@UseInterceptors(ClassSerializerInterceptor)
export class DoctorWeeklyScheduleController {
    constructor(private readonly doctorWeeklyScheduleService: DoctorWeeklyScheduleService) { }

    @Post()
    @UseInterceptors(DoctorWeeklyScheduleInterceptor)
    create(@Body() createDoctorWeeklyScheduleDto: CreateDoctorWeeklyScheduleDto) {
        return this.doctorWeeklyScheduleService.create(createDoctorWeeklyScheduleDto);
    }

    @Get('doctor-schedule/:id')
    findAllForDoctor(@Param('id') id: UUID) {
        return this.doctorWeeklyScheduleService.findAllForDoctor(id);
    }

    @Post(':id')
    update(@Param('id') id: UUID, @Body() updateDoctorWeeklyScheduleDto: UpdateDoctorWeeklyScheduleDto) {
        return this.doctorWeeklyScheduleService.update(id, updateDoctorWeeklyScheduleDto);
    }
}
