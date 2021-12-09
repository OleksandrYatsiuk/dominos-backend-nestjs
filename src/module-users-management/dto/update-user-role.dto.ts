import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/enums/roles.enum';

export class UpdateUserRoleDto {
    @ApiProperty({ type: String, required: false, enum: [UserRole.ADMIN, UserRole.BUYER], default: UserRole.BUYER })
    role: UserRole;
}
