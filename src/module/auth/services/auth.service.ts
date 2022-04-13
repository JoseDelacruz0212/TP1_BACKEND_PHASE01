import { Injectable } from '@nestjs/common';
import { UserService } from 'src/module/user/services/user.service';
import {compare}from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService,
        private readonly jwtService:JwtService
    ){}
    async validateUser(userEmail:string,passwordUser:string):Promise<any>{
        const user= await this.userService.findByEmail({userEmail});
        //verificando si existe algun usuario con el email ingresado
        if(!user){
            return null;
        }
        //verificando si se encuentra autorizado para logearse y coincide las contraseñas
        if(user.status==true&&  await compare(passwordUser,user.passwordUser)){
            const { passwordUser, ...rest } = user;
            return rest;
        }
        return null;
    }
    login(user: User) {
       console.log(user);
        const { idUser, ...rest } = user;
        const payload = { sub: idUser };
        return{ 
        user,
          accessToken: this.jwtService.sign(payload),
        }
      }
}
