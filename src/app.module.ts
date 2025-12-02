import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from './data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { SpecializationModule } from './specialization/specialization.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { MailModule } from './mail/mail.module';
import { MailQueueModule } from './mail-queue/mail-queue.module';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware/middleware-consumer.interface';
import { AwsService } from './aws/aws.service';
import { DoctorWeeklyScheduleModule } from './doctor-weekly-schedule/doctor-weekly-schedule.module';
import { DoctorTimeSlotModule } from './doctor-time-slot/doctor-time-slot.module';
import multer from 'multer';
import { GenerateDoctorAvailabilityTimeSlotsCommand } from './command/generate-doctor-availability-time-slots';
import { TaskSchedulerService } from './task-scheduler/task-scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    UserModule,
    DoctorModule,
    PatientModule,
    SpecializationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    MailModule,
    MailQueueModule,
    DoctorWeeklyScheduleModule,
    DoctorTimeSlotModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AwsService,
    GenerateDoctorAvailabilityTimeSlotsCommand,
    TaskSchedulerService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(multer().single('file')).forRoutes('user/upload-image');
  }
}
