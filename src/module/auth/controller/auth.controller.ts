import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { userDecorator } from 'src/commom/decorators/user.decorator';
import { User } from 'src/entity/user.entity';
import { LoginDto } from '../dtos/login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}
  // first the authguard use the strategy
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() LoginDto: LoginDto, @userDecorator() user: User) {
    const data = await this.AuthService.login(user);
    return { message: 'Successful login', data };
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  profile(@userDecorator() user: User) {
    return { message: 'User found', user };
  }
  @UseGuards(JwtAuthGuard)
  //refresh token
  @Get('refresh')
  @ApiBearerAuth()
  refreshtoken(@userDecorator() user: User) {
    const data = this.AuthService.login(user);
    return { message: 'refresh Token', data };
  }
}
