import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kid } from 'src/entity/kid.entity';
import { User } from 'src/entity/user.entity';
import {  Repository } from 'typeorm';
import { KidDto } from '../dtos/kid.dto';

@Injectable()
export class KidService {
    constructor(
        @InjectRepository(Kid)
        private kidRepository: Repository<Kid>,
        @InjectRepository(User)
        private UserRepository:Repository<User>,
      ) {}

      async getAll(): Promise<Kid[]> {
        const list = await this.kidRepository.find();
        if (!list.length) {
          throw new NotFoundException({ mesage: 'The list of Kids is empty' });
        }
        return list;
      }
      
      async  findByUserId(userId:string): Promise<Kid[]> {
          let listKidByUser= await this.kidRepository.createQueryBuilder('kid')
          .where(`kid.UserId='${userId}'`)
          .getRawMany();
          return listKidByUser;
      }

      async findById(id:string,kidEntity?:Kid): Promise<Kid> {
        const findKidById = await this.kidRepository.findOne(id)
        .then(x => (!kidEntity ? x : !!x && kidEntity.id === x.id ? x : null));
        if (!findKidById) {
          throw new NotFoundException({ mesage: 'Kid not found' });
        }
        return findKidById;
      }
      async delete(id: string): Promise<any> {
        const kid = await this.findById(id);
        await this.kidRepository.delete(kid);
        return { message: `The kid ${kid.firstName+' '+kid.lastName} deleted` };
      }

      async create(dto: KidDto): Promise<any> {
      try 
      {
        const user=await this.UserRepository.findOne(dto.UserId);
        const kid = await this.kidRepository.create(dto);
        kid.user=user;
        await this.kidRepository.save(kid);
        return { message: `The kid ${kid.firstName+' '+kid.lastName} created` };
      }catch (error)
        {
        throw new NotFoundException({ mesage: 'User ID nout found' });
        } 
      }
      async update(id: string, dto: KidDto): Promise<any> {
        const kid = await this.findById(id);
        dto.firstName
          ? (kid.firstName = dto.firstName)
          : (kid.firstName = kid.firstName);
        dto.birthDate
          ? (kid.birthdate = dto.birthDate)
          : (kid.birthdate = kid.birthdate);
        dto.lastName
          ? (kid.lastName = dto.lastName)
          : (kid.lastName = kid.lastName);
        dto.gender
          ? (kid.gender = dto.gender)
          : (kid.gender = kid.gender);
        dto.dni
          ? (kid.dni = dto.dni)
          : (kid.dni = kid.dni);
        await this.kidRepository.save(kid);
        return { message: `kid ${kid.firstName} updated` };
      }
    
}
