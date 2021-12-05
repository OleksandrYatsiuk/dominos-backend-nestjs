import { Controller, Get, Post, Body, UseInterceptors, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Request } from 'express';
import { User } from './entities/user.entity';

@ApiTags('Users')
@ApiExtraModels(User)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: CreateUserDto })
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)

  @ApiOkResponse({ type: User })
  @ApiUnauthorizedResponse()
  @Get('/current')
  current(@Req() req: Request & { userId: string }) {
    return this.usersService.current(req.userId).then(user => new User(user));
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
