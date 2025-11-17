import {
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import UserRole from '../../Enum/UserRole';
import { IS_ROLES_KEY } from 'src/decorators/roles.decorator';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const role = this.reflector.getAllAndOverride<UserRole>(IS_ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (role === UserRole.ADMIN) {
            return true;
        }
        if (!role && user.id == request.params.id) {
            return true;
        }
        return false;
    }
}