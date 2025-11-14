import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, first, map } from 'rxjs';

@Injectable()
export class PatientResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => data.map(patient => {
                return {
                    [patient.id]: {
                        user_id: patient.user.id,
                        first_name: patient.user.first_name,
                        last_name: patient.user.last_name,
                        email: patient.user.email,
                        date_of_birth: patient.user.date_of_birth,
                        gender: patient.user.gender,
                        phone_number: patient.user.phone_number,
                        medical_history: patient.medical_history,
                        blood_group: patient.blood_group,
                        emergency_contact: patient.emergency_contact
                    }
                }
            }))
        );
    }
}
