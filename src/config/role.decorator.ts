import { SetMetadata } from '@nestjs/common';
import { SystemRole } from './enum';

export const ROLES_KEY = 'role';
export const Roles = (...role: SystemRole[]) => SetMetadata(ROLES_KEY, role);
