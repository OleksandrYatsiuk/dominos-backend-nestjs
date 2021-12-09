import { Controller, Get, Post, Body, UseInterceptors, UseGuards, Req, Res, HttpStatus, Patch, UploadedFile, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth, ApiConsumes, ApiExtraModels, ApiNoContentResponse, ApiOkResponse,
  ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Request, Response } from 'express';
import { ModelUser } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserCoordinatesDto } from './dto/update-user-coords.dto';
import { UpdateProfileImageDto } from './dto/update-image.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';


type UserRequest = Request & { user: ModelUser };

@ApiTags('Users')
@ApiExtraModels(ModelUser)
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('user')
@ApiUnauthorizedResponse()

export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOkResponse({ type: ModelUser })
  @Get('/current')
  current(@Req() req: UserRequest) {
    return req.user;
  }

  @ApiNoContentResponse()
  @Post('/logout')
  logout(@Res() res: Response, @Req() req: UserRequest & { authorization: string }) {
    return this.usersService.logout(req.authorization)
      .then(() => res.status(HttpStatus.NO_CONTENT).send())
  }

  @ApiOkResponse({ type: ModelUser })
  @Patch('/profile')
  update(@Req() req: UserRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto).then(user => new ModelUser(user))
  }


  @ApiOkResponse({ type: ModelUser })
  @Put('/geolocation')
  updateGeoLocation(@Req() req: UserRequest, @Body() body: UpdateUserCoordinatesDto) {
    return this.usersService.updateGeoLocation(req.user.id, body).then(user => new ModelUser(user))
  }

  @ApiOkResponse({ type: ModelUser })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('/profile-image')
  uploadImage(@Req() req: UserRequest, @Body() body: UpdateProfileImageDto, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    return this.usersService.uploadImage(req.user.id, file)
      .then(result => res.status(HttpStatus.OK).send(new ModelUser(result)))
  }

  @ApiOkResponse()
  @Put('/change-password')
  changePassword(@Req() req: UserRequest & { authorization: string }, @Body() body: UpdatePasswordDto, @Res() res: Response) {
    return this.usersService.updatePassword(req.user.id, body, req.authorization)
      .then(() => {
        res.status(HttpStatus.OK).send(true);
      })
  }
}
