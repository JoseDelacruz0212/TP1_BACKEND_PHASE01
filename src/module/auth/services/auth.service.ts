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
    async validateUser(Email:string,passwordUser:string):Promise<any>{
        const user= await this.userService.findByEmail({Email});
        //verificando si existe algun usuario con el email ingresado
        if(!user){
            return null;
        }
        //verificando si se encuentra autorizado para logearse y coincide las contraseñas
        if(user.Status==true&&  await compare(passwordUser,user.Password)){
            const { Password, ...rest } = user;
            return rest;
        }
        return null;
    }
    login(user: User) {
       console.log(user);
        const { IdUser, ...rest } = user;
        const payload = { sub: IdUser };
        return{ 
        user,
          accessToken: this.jwtService.sign(payload),
        }
      }
}
