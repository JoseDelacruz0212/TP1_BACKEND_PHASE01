import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from 'src/entity/institution.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { EditUserDto } from '../dtos/edit-user.dto';
import {
  ADMIN_ROLE,
  INSTITUTION_ROLE,
  TEACHER_ROLE
} from '../../../config/constants';
export interface UserFindOne {
  idUser?: string;
  email?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Institution)
    private institutionRepository: Repository<Institution>
  ) { }

  async getAll(): Promise<User[]> {
    const list = await this.userRepository.find();
    if (!list.length) {
      throw new NotFoundException({ mesage: 'The list is empty' });
    }
    return list;
  }
  async gettAllAdmin(): Promise<User[]> {
    const list = await this.userRepository.find({
      where: {
        roles: 'admin',
      },
    });
    if (!list.length) {
      throw new NotFoundException({ mesage: 'The list is empty' });
    }
    return list;
  }
  async findById(id: string, userEntity?: User): Promise<User> {
    const user = await this.userRepository
      .findOne(id)
      .then((u) =>
        !userEntity ? u : !!u && userEntity.idUser === u.idUser ? u : null,
      );
    if (!user) {
      throw new NotFoundException({
        mesage: `User doesn't exist or not authorized to access`,
      });
    }
    return user;
  }
  async findByNombre(name: string): Promise<User> {
    const user = await this.userRepository.findOne({
      name: name,
    });
    return user;
  }
  async create(dto: CreateUserDto, user: User): Promise<any> {
    var email = dto.email;
    var isEmailExists = await this.findByEmail({ email });
    if ( isEmailExists == undefined) {
      if (user.roles.includes(ADMIN_ROLE)) {
        if (dto.roles.includes(ADMIN_ROLE)) {
          const newUser = await this.userRepository.create(dto);
          newUser.status = true;
          newUser.createdBy = user.email;
          newUser.updatedBy = user.email;
          await this.userRepository.save(newUser);
          return { message: `User ${newUser.email} created` };
        }
        else {
          var getInstitution = await this.institutionRepository.findOne({
            where: {
              id: dto.insitutionId
            }
          });
          if (getInstitution != undefined) {
            const newUser = await this.userRepository.create(dto);
            newUser.institution = getInstitution;
            newUser.createdBy = user.email;
            newUser.updatedBy = user.email;
            await this.userRepository.save(newUser);
            return { message: `User ${newUser.email} created` };
          } else {
            throw new NotFoundException({
            });
          }
        }
      }
      else {
        if (user.roles.includes(INSTITUTION_ROLE)) {
          const newUser = await this.userRepository.create(dto);
          newUser.institution = user.institution;
          newUser.createdBy = user.email;
          newUser.updatedBy = user.email;
          newUser.updatedOn= new Date();
          await this.userRepository.save(newUser);
          return { message: `Usuario creado` };
        }
        else{
          throw UnauthorizedException;
        }
      }
    }
    else {
      return { message: `El usuario ya se encuentra registrado` };
    }
  }
  async assignInstitution(id: string, institutionId: string, userEntity?: User): Promise<any> {
    const user = await this.findById(id, userEntity);
    const institution = await this.institutionRepository.findOne(institutionId);
    if (institution) {
      user.institution = institution;
    }
    else {
      throw new NotFoundException({
        message: `Institution with id=${id} does not exist`,
      });
    }
    return await this.userRepository.save(user);
  }

  async update(id: string, dto: EditUserDto, userEntity?: User): Promise<any> {
    const user = await this.findById(id, userEntity);
    const editedUser = Object.assign(user, dto);
    return await this.userRepository.save(user);
  }
  async updatePartial(
    id: string,
    dto: EditUserDto,
    userEntity: User,
  ): Promise<any> {
    if (userEntity.roles.includes(ADMIN_ROLE) || userEntity.roles.includes(INSTITUTION_ROLE)) {
      const user = await this.findById(id, userEntity);
      const updatedUser = { ...user };
      updatedUser.status = dto.status;
      updatedUser.updatedBy=userEntity.email;
      updatedUser.updatedOn=new Date();
      return await this.userRepository.save(updatedUser);
    } else {
      throw UnauthorizedException;
    }

  }
  async deletePartial(
    id: string,
    dto: EditUserDto,
    userEntity?: User,
  ): Promise<any> {
    const user = await this.findById(id, userEntity);
    const updatedUser = { ...user };
    updatedUser.isDeleted = dto.isDeleted;
    return await this.userRepository.save(updatedUser);
  }
  async delete(id: string, userEntity?: User): Promise<any> {
    const user = await this.findById(id, userEntity);
    await this.userRepository.remove(user);
    return { message: `User ${user.email} deleted` };
  }
  async findByEmail(data: UserFindOne) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(data)
      .addSelect('user.password')
      .getOne();
  }
}
