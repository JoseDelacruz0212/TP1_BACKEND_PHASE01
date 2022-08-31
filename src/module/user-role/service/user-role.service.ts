import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoles } from 'src/entity/user-roles.entity';
import { Repository } from 'typeorm';
import { CreateUserRoleDto } from '../dto/create-user-role.dto';
import { UpdateUserRolesDto } from '../dto/update-user-role.dto';

@Injectable()
export class UserRoleService {
    constructor(
        @InjectRepository(UserRoles) private repository: Repository<UserRoles>,
      ) {}
    
      async create(createUserRoleDto: CreateUserRoleDto) {
        const newUserRole = this.repository.create(createUserRoleDto);
        await this.repository.save(newUserRole);
        return { message: 'UserRole created' };
      }
    
      async getAll() {
        const usersRoles = await this.repository.find();
        return usersRoles;
      }
    
      async findById(id: string) {
        const userRole = await this.repository.findOne(id);
        if (!userRole)
          throw new NotFoundException({
            message: `UserRole with id=${id} does not exist`,
          });
        return userRole;
      }
    
      async update(id: string, updateUserRoleDto: UpdateUserRolesDto) {
        await this.findById(id);
        await this.repository.update(id, updateUserRoleDto);
        return { message: 'UserRole updated' };
      }
    
      async remove(id: string) {
        const userRole = await this.findById(id);
        userRole.isDeleted = true;
        await this.repository.save(userRole);
        return { message: 'UserRole deleted' };
      }
}
