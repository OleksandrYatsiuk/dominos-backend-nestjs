import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/enums/roles.enum';

export class UpdateUserRoleDto {
    @ApiProperty({ type: String, required: false, enum: UserRole, default: UserRole.Buyer })
    role: UserRole;
}
