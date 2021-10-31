import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import Login from 'src/dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(loginInfo: Login): Promise<any> {
    const user = await this.authService.validateUser(loginInfo);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
