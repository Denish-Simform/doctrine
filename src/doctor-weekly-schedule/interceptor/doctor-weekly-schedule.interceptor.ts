import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import UserRole from 'src/Enum/UserRole';

@Injectable()
export class DoctorWeeklyScheduleInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const role = request.user.role;

    if (role === UserRole.DOCTOR) {
      request.body.doctor_id = request.user.id;
    }

    return next.handle();
  }
}
