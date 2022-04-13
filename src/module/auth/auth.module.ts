import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.stategy';
import { JWT_SECRET } from 'src/config/constants';


@Module({
  imports:[
    PassportModule.register({
      defaultStrategy:'jwt'
    }),
  JwtModule.registerAsync({
   inject:[ConfigService],
   useFactory:(config:ConfigService)=>({
     secret:config.get<string>(JWT_SECRET),
     signOptions:{expiresIn:'60m'}
   })
  }),
    UserModule
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
