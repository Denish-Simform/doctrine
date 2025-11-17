import { Controller, Get, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { UUID } from 'node:crypto';
import { DoctorResponseInterceptor } from 'src/doctor-response/doctor-response.interceptor';
import { Public } from 'src/decorators/public.decorator';

@UseInterceptors(DoctorResponseInterceptor)
@Controller('doctor')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) { }

    @Get()
    @Public()
    findAll() {
        return this.doctorService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: UUID) {
        return this.doctorService.findOne(id);
    }
}
