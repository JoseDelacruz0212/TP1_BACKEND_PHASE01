import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from 'src/entity/institution.entity';
import { Repository } from 'typeorm';
import { CreateInstitutionDto } from '../dto/create-institution.dto';
import { UpdateInstitutionDto } from '../dto/update-institution.dto';

@Injectable()
export class InstitutionService {

  constructor(@InjectRepository(Institution) private respository: Repository<Institution>) {}

  async create(createInstitutionDto: CreateInstitutionDto) {
   const newInstitution = this.respository.create(createInstitutionDto);
   await this.respository.save(newInstitution);
   return { message: 'Institution created' }
  }

  async getAll() {
    const institutions = await this.respository.find();
    return institutions;
  }

  async findById(id: string) {
    const institution = await this.respository.findOne(id);
    if (!institution) {
      throw new NotFoundException({
        message: `Institution with id=${id} does not exist`
      });
    }

    return institution;
  }

  async update(id: string, updateInstitutionDto: UpdateInstitutionDto) {
    await this.findById(id);
    await this.respository.update(id, updateInstitutionDto);
    return { message: 'Institution updated' }
  }

  async remove(id: string) {
    const result = await this.respository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException({ message: 'Institution to delete does not exist' });
    }

    return { message: 'Institution deleted' }
  }
}
