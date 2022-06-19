import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { EditUserDto } from '../dtos/edit-user.dto';
export interface UserFindOne{
    idUser?:string;
    email?:string;
}
@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}
    
      async getAll(): Promise<User[]> {
        const list = await this.userRepository.find();
        if (!list.length) {
          throw new NotFoundException({ mesage: 'The list is empty' });
        }
        return list;
      }
      async gettAllAdmin(): Promise<User[]> {
        const list = await this.userRepository.find({where:{
          roles:'admin'
        }})
        if (!list.length) {
          throw new NotFoundException({ mesage: 'The list is empty' });
        }
        return list;
      }
      async findById(id: string,userEntity?:User): Promise<User> {
        const user = await this.userRepository.findOne(id)
        .then(u => (!userEntity ? u : !!u && userEntity.idUser === u.idUser ? u : null));
        if (!user) {
          throw new NotFoundException({ mesage: `User doesn't exist or not authorized to access` });
        }
        return user;
      }
      async findByNombre(name: string): Promise<User> {
        const user = await this.userRepository.findOne({
          name: name,
        });
        return user;
      }
      async create(dto: CreateUserDto): Promise<any> {
        var email=dto.email;
        var isEmailExists= await this.findByEmail({email});
        if(!isEmailExists){
          const newUser = await this.userRepository.create(dto);
          await this.userRepository.save(newUser);
          return { message: `User ${newUser.email} created` };
        }else{
          return { message: `User ${dto.email} already Exists` };
        }
      }
    
      async update(id: string, dto: EditUserDto,userEntity?:User): Promise<any> {
        const user = await this.findById(id,userEntity);
        const editedUser = Object.assign(user, dto);
        return await this.userRepository.save(user);
      }
      async updatePartial(id: string, dto: EditUserDto,userEntity?:User): Promise<any> {
        const user = await this.findById(id,userEntity);
        const updatedUser={...user}
        updatedUser.status=dto.status;
        return await this.userRepository.save(updatedUser);
      }
      async deletePartial(id: string, dto: EditUserDto,userEntity?:User): Promise<any> {
        const user = await this.findById(id,userEntity);
        const updatedUser={...user}
        updatedUser.isDeleted=dto.isDeleted;
        return await this.userRepository.save(updatedUser);
      }
      async delete(id: string,userEntity?:User): Promise<any> {
        const user = await this.findById(id,userEntity);
        await this.userRepository.remove(user);
        return { message: `User ${user.email} deleted` };
      }
      async findByEmail(data:UserFindOne){
          return await this.userRepository
          .createQueryBuilder('user')
          .where(data)
          .addSelect('user.password')
          .getOne()
      }
      
}
