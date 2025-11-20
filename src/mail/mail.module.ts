import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailQueueModule } from 'src/mail-queue/mail-queue.module';

@Module({
    providers: [MailService],
    exports: [MailService],
    imports: [MailQueueModule]
})
export class MailModule { }
