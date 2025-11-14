import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class DoctorResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => data.map((doctor) => {
                return {
                    [doctor.id]: {
                        user_id: doctor.user.id,
                        first_name: doctor.user.first_name,
                        last_name: doctor.user.last_name,
                        email: doctor.user.email,
                        phone_number: doctor.user.phone_number,
                        date_of_birth: doctor.user.date_of_birth,
                        specialization: doctor.specialization.name,
                        licence_number: doctor.license_number,
                        years_of_experience: doctor.years_of_experience,
                        education: doctor.education,
                        consultation_fee: doctor.consultation_fee,
                        home_visit_fee: doctor.home_visit_fee,
                        telemedicine_fee: doctor.telemedicine_fee,
                        average_rating: doctor.average_rating,
                        review_count: doctor.review_count
                    }
                }
            }))
        );
    }
}
