import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from 'src/mail/mail.service';

@Processor('mail')
export class MailQueueProcessor {
  constructor(private mailService: MailService) {}

  @Process('sendVerificationEmail')
  async handleSendVerificationEmail(
    job: Job<{ email: string; token: string }>,
  ) {
    const { email, token } = job.data;
    await this.mailService.sendVerificationEmail(email, token);

    return true;
  }
}
