import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from 'src/entity/institution.entity';
import { Repository } from 'typeorm';
import { CreateInstitutionDto } from '../dto/create-institution.dto';
import { UpdateInstitutionDto } from '../dto/update-institution.dto';
import {
  ADMIN_ROLE,
  INSTITUTION_ROLE
} from '../../../config/constants';
import { User } from 'src/entity/user.entity';

@Injectable()
export class InstitutionService {
  constructor(
    @InjectRepository(Institution) private respository: Repository<Institution>,
  ) { }
  //COD INSTITUTION-01
  async create(createInstitutionDto: CreateInstitutionDto, user: User) {
    if (user.roles.includes(ADMIN_ROLE)) {
      const newInstitution = this.respository.create(createInstitutionDto);
      await this.respository.save(newInstitution);
      return { newInstitution };
    } else {
      throw new UnauthorizedException({
        message: 'Please contact with the administrator to execute this request',
      });
    }
  }
  //COD INSTITUTION-02
  async getAll(user: User) {
    if (user.roles.includes(ADMIN_ROLE)) {
      const institutions = await this.respository.find();
      return institutions;
    } else {
      throw new UnauthorizedException({
        message: 'Please contact with the administrator to execute this request',
      });
    }
  }
  //COD INSTITUTION-03
  async update(id: string, updateInstitutionDto: UpdateInstitutionDto, user: User) {
    if (user.roles.includes(ADMIN_ROLE) || user.roles.includes(INSTITUTION_ROLE)) {
      var institution=await this.findById(id);
      institution.code=updateInstitutionDto.code;
      institution.direction=updateInstitutionDto.direction;
      institution.name=updateInstitutionDto.name;
      await this.respository.update(id, institution);
      return { message: 'Institution updated' };
    }
    else {
      throw new UnauthorizedException({
        message: 'Please contact with the administrator to execute this request',
      });
    }
  }
  //COD INSTITUTION-04
  async remove(id: string, user: User) {
    if (user.roles.includes(ADMIN_ROLE)) {
      const result = await this.respository.delete({ id });
      if (result.affected === 0) {
        throw new NotFoundException({
          message: 'Institution to delete does not exist',
        });
      }
      return { message: 'Institution deleted' };
    }
    else {
      throw new UnauthorizedException({
        message: 'Please contact with the administrator to execute this request',
      });
    }
  }
  async findById(id: string) {
    const institution = await this.respository.findOne(id);
    if (!institution) {
      throw new NotFoundException({
        message: `Institution with id=${id} does not exist`,
      });
    }
    return institution;
  }
}
