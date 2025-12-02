import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { UUID } from 'node:crypto';
import { PatientResponseInterceptor } from 'src/patient-response/patient-response.interceptor';

@UseInterceptors(PatientResponseInterceptor)
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.patientService.findOne(id);
  }
}
