import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { DoctorTimeSlotService } from './doctor-time-slot.service';
import { UpdateDoctorTimeSlotDto } from './dto/update-doctor-time-slot.dto';
import { UUID } from 'node:crypto';

@Controller('doctor-time-slot')
export class DoctorTimeSlotController {
  constructor(private readonly doctorTimeSlotService: DoctorTimeSlotService) {}

  @Get(':id')
  findAllByDoctor(@Param('id') id: UUID) {
    return this.doctorTimeSlotService.findAllByDoctor(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: UUID,
    @Body() updateDoctorTimeSlotDto: UpdateDoctorTimeSlotDto,
  ) {
    return this.doctorTimeSlotService.update(id, updateDoctorTimeSlotDto);
  }

  @Get(':id/:dayOfWeek')
  @UseInterceptors(ClassSerializerInterceptor)
  findAllByDoctorAndDay(
    @Param('id') id: UUID,
    @Param('dayOfWeek') dayOfWeek: string,
  ) {
    return this.doctorTimeSlotService.findAllByDoctorAndDay(id, dayOfWeek);
  }
}
