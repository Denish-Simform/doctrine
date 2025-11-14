import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from './data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { SpecializationModule } from './specialization/specialization.module';

@Module({
    imports: [TypeOrmModule.forRoot(AppDataSource.options), UserModule, DoctorModule, PatientModule, SpecializationModule],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule { }
