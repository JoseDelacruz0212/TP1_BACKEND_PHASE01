import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from 'src/entity/institution.entity';
import { User } from 'src/entity/user.entity';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { EditUserDto } from '../dtos/edit-user.dto';
import {
  ADMIN_ROLE,
  INSTITUTION_ROLE,
  TEACHER_ROLE
} from '../../../config/constants';
import { roles } from 'src/app.roles';
import { and } from 'sequelize/types';
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

  async getAll(user: User): Promise<User[]> {
    let list;
    if (user.roles.includes(ADMIN_ROLE)) {
      list = await this.userRepository.find();
      if (!list.length) {
        throw new NotFoundException({ mesage: 'The list is empty' });
      }
      return list;
    } else {
      if (user.roles.includes(INSTITUTION_ROLE)) {
        list = await this.userRepository.find({
          where: {
            institution: user.institution,
            roles: Not("admin")
          }
        });
        return list;
      } else {
        if (user.roles.includes(TEACHER_ROLE)) {
          list = await this.userRepository.find({
            where: [
              {
                institution: user.institution,
                roles: Not("admin")
              },
              {
                roles: Not("institution")
              }
            ]
          });
          return list;
        }
        else {
          throw new UnauthorizedException();
        }

      }

    }


  }
  async gettAllAdmin(): Promise<User[]> {
    const list = await this.userRepository.find({
      where: {
        roles: 'admin',
      },
      select: (['idUser', 'email', 'name', 'lastName', 'createdOn'])
    });
    if (!list.length) {
      throw new NotFoundException({ mesage: 'The list is empty' });
    }
    return list;
  }


  async findByIdToModifyStatus(id: string, userEntity?: User): Promise<User> {
    const user = await this.userRepository
      .findOne(id);
    if (!user) {
      throw new NotFoundException({
        mesage: `No se encontro el usuario`,
      });
    }
    if (userEntity.roles.includes(ADMIN_ROLE)) {
      return user;
    }
    if (userEntity.roles.includes(INSTITUTION_ROLE)) {
      if (user.roles.includes(ADMIN_ROLE) || user.roles.includes(INSTITUTION_ROLE)) {
        throw new UnauthorizedException({
          mesage: `No tiene los permisos para ejecutar está acción`,
        });
      } else {
        return user;
      }
    }
    if(userEntity.roles.includes(TEACHER_ROLE)){
      if (user.roles.includes(ADMIN_ROLE) || user.roles.includes(INSTITUTION_ROLE)||user.roles.includes(TEACHER_ROLE)) {
        throw new NotFoundException({
          mesage: `No tiene los permisos para ejecutar está acción`,
        });
      } else {
        return user;
      }
    }
  }

  async findByIdToDelete(id: string, userEntity?: User): Promise<User> {
    const user = await this.userRepository
      .findOne(id);
    if (!user) {
      throw new NotFoundException({
        mesage: `User doesn't exist or not authorized to access`,
      });
    }
    if (userEntity.roles.includes(ADMIN_ROLE)) {
      return user;
    }
    if (userEntity.roles.includes(INSTITUTION_ROLE)) {
      if (user.roles.includes(ADMIN_ROLE) || user.roles.includes(INSTITUTION_ROLE)) {
        throw new NotFoundException({
          mesage: `User doesn't exist or not authorized to access`,
        });
      } else {
        return user;
      }
    }
    if (user.idUser == userEntity.idUser) {
      return user;
    }
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
    if (isEmailExists == undefined) {
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
          newUser.updatedOn = new Date();
          await this.userRepository.save(newUser);
          return { message: `Usuario creado` };
        }
        else {
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
      const user = await this.findByIdToModifyStatus(id, userEntity);
      const updatedUser = { ...user };
      updatedUser.status = dto.status;
      updatedUser.updatedBy = userEntity.email;
      updatedUser.updatedOn = new Date();
      return await this.userRepository.save(updatedUser);
    } else {
      throw UnauthorizedException;
    }

  }
  async updateAvatar(
    dto: EditUserDto,
    userEntity: User,
  ): Promise<any> {
    const user = await this.findByToken( userEntity.idUser);
    const editedUser = Object.assign(user, dto);
    return await this.userRepository.save(user);

  }
  async deletePartial(
    id: string,
    dto: EditUserDto,
    userEntity?: User,
  ): Promise<any> {
    const user = await this.findByIdToDelete(id, userEntity);
    const updatedUser = { ...user };
    updatedUser.isDeleted = dto.isDeleted;
    return await this.userRepository.save(updatedUser);
  }
  async delete(id: string, userEntity?: User): Promise<any> {
    const user = await this.findByIdToDelete(id, userEntity);
    await this.userRepository.remove(user);
    return { message: `User ${user.email} deleted` };
  }

  async findByToken(id:string) {
    return await this.userRepository.findOne(id);
  }
  async findByEmail(data: UserFindOne) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(data)
      .addSelect('user.password')
      .getOne();
  }
}
