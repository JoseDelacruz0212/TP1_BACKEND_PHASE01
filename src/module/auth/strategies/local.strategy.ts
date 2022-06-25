import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'userEmail',
      passwordField: 'passwordUser',
    });
  }
  async validate(userEmail: string, passwordUser: string) {
    const user = await this.authService.validateUser(userEmail, passwordUser);
    if (!user)
      throw new UnauthorizedException(
        'Incorrect data or you are not yet authorized to log in',
      );
    return user;
  }
}
