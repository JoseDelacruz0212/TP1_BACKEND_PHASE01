import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/entity/roles.entity';
import { Repository } from 'typeorm';
import { CreateRolesDto } from '../dto/create-role.dto';
import { UpdateRolesDto } from '../dto/update-role.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Roles) private respository: Repository<Roles>,
      ) {}
    
      async create(CreateRolesDto: CreateRolesDto) {
        const newRoless = this.respository.create(CreateRolesDto);
        await this.respository.save(newRoless);
        return { message: 'Rol created' };
      }
    
      async getAll() {
        const Roless = await this.respository.find();
        return Roless;
      }
    
      async findById(id: string) {
        const Roless = await this.respository.findOne(id);
        if (!Roless) {
          throw new NotFoundException({
            message: `Roles with id=${id} does not exist`,
          });
        }
    
        return Roless;
      }
    
      async update(id: string, updateRolessDto: UpdateRolesDto) {
        await this.findById(id);
        await this.respository.update(id, updateRolessDto);
        return { message: 'Roles updated' };
      }
    
      async remove(id: string) {
        const result = await this.respository.delete({ id });
        if (result.affected === 0) {
          throw new NotFoundException({
            message: 'Roless to delete does not exist',
          });
        }
    
        return { message: 'Roless deleted' };
      }

}
