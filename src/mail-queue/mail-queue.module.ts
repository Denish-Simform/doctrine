import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailQueueProcessor } from './mail-queue.processor';
import { MailService } from 'src/mail/mail.service';

@Module({
    providers: [MailQueueProcessor, MailService],
    imports: [ 
        BullModule.forRoot({
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),

        BullModule.registerQueue({
            name: 'mail',
        }),
    ],
    exports: [BullModule],
})
export class MailQueueModule {}
