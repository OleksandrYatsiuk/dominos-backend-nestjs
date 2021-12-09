import { Controller, Get, Param, Delete, Query, UseGuards, Res, HttpStatus, Put, Body } from '@nestjs/common';
import { UsersManagementService } from './users-management.service';
import { ApiBearerAuth, ApiNoContentResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@decorators/pagination';
import { ModelUser } from 'src/module-users/entities/user.entity';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Response } from 'express';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/guards/roles/roles.decorator';
import { UserRole } from 'src/enums/roles.enum';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@ApiUnauthorizedResponse()
@Roles(UserRole.ADMIN)
@Controller('users-management')
@ApiTags('Users Management')
export class UsersManagementController {
  constructor(private readonly usersManagementService: UsersManagementService) { }

  @Get()
  @ApiPaginatedResponse(ModelUser)

  @ApiQuery({ name: 'sort', description: 'createdAt, username, -createdAt, -username...', type: String, required: false })
  @ApiQuery({ name: 'limit', example: 20, type: Number, required: false })
  @ApiQuery({ name: 'page', example: 1, type: Number, required: false })

  findAll(@Query() query: any) {
    return this.usersManagementService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: ModelUser })
  findOne(@Param('id') id: string) {
    return this.usersManagementService.findOne(id);
  }

  @Put(':id/role')
  @ApiOkResponse({ type: ModelUser })
  updateRole(@Param('id') id: string, @Body() body: UpdateUserRoleDto) {
    return this.usersManagementService.updateRole(id, body);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  remove(@Param('id') id: string, @Res() res: Response): void {
    this.usersManagementService.remove(id).then(() => res.status(HttpStatus.NO_CONTENT).send())
  }
}
