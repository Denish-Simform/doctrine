import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { maxFileUploadSize, allowedMimeTypes } from 'src/auth/constants';

@Injectable()
export class ImageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const file = request.file;
    console.log('Inside ImageInterceptor');
    if (file) {
      if (file.size > maxFileUploadSize) {
        // 5MB limit
        throw new Error('File size exceeds the limit of 5MB');
      }
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new Error(
          'Invalid file type. Only JPEG, PNG, and GIF are allowed.',
        );
      }
      // Process the image file here (e.g., validate, resize, etc.)
      console.log('Image file intercepted:', file.originalname);
    }
    return next.handle();
  }
}
