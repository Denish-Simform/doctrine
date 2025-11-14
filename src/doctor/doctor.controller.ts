import { Controller, Get, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { UUID } from 'node:crypto';
import { DoctorResponseInterceptor } from 'src/doctor-response/doctor-response.interceptor';

@UseInterceptors(DoctorResponseInterceptor)
@Controller('doctor')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) { }

    @Get()
    findAll() {
        return this.doctorService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: UUID) {
        return this.doctorService.findOne(id);
    }
}
