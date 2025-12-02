import { SetMetadata } from '@nestjs/common';
import UserRole from '../Enum/UserRole';

export const IS_ROLES_KEY = 'roles';
export const Roles = (roles: UserRole[]) => SetMetadata(IS_ROLES_KEY, roles);
