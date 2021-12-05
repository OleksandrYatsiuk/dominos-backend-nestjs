import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/module-auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(forwardRef(() => AuthService)) private readonly authService: AuthService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const authTokenHeader = (request.headers['Authorization'] || request.headers['authorization']) as string;

    if (authTokenHeader) {
      const userId = await this.authService.validateUser(authTokenHeader.replace('Bearer ', ''));
      if (userId) {
        request.userId = userId;
        return true;
      }
    }
    throw new UnauthorizedException();
  }
}
