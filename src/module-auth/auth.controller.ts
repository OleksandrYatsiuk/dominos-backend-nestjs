import { Controller, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ModelUser } from 'src/module-users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthLoginResponse } from './entities/auth.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiCreatedResponse({ type: ModelUser })
  @Post('/register')
  async create(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto).then(user => new ModelUser(user));
  }

  @ApiCreatedResponse({ type: AuthLoginResponse })
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
