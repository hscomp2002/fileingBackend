import { Controller, Post, BadRequestException, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import Login from './dto/login.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() loginInfo: Login) {
    const res = await this.authService.validateUser(loginInfo);
    if (!res) {
      throw new BadRequestException('User not found');
    }
    const token = await this.authService.login(res);
    return { token, ...res };
  }
}
