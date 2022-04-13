import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneralQuestions } from 'src/entity/generalQuestions.entity';
import { Repository } from 'typeorm';
import { GeneralQuestionsDto } from '../dtos/general-questions';

@Injectable()
export class GeneralQuestionsService {
    constructor(
        @InjectRepository(GeneralQuestions)
        private generalQuestionsRepository: Repository<GeneralQuestions>
      ) {}

  async getAll(): Promise<GeneralQuestions[]> {
        const list = await this.generalQuestionsRepository.find();
        if (!list.length) {
          throw new NotFoundException({ mesage: 'The list of General questions is empty' });
        }
        return list;
      }
      async findById(id:string,GeneralQuestionsEntity?:GeneralQuestions): Promise<GeneralQuestions> {
        const findGeneralQuestionsById = await this.generalQuestionsRepository.findOne(id)
        .then(x => (!GeneralQuestionsEntity ? x : !!x && GeneralQuestionsEntity.id === x.id ? x : null));
        if (!findGeneralQuestionsById) {
          throw new NotFoundException({ mesage: 'General questions not found' });
        }
        return findGeneralQuestionsById;
      }
      async delete(id: string): Promise<any> {
        const generalQuestions = await this.findById(id);
        await this.generalQuestionsRepository.delete(generalQuestions);
        return { message: `The General question ${generalQuestions.typeQuestion+'for age in month:'+ generalQuestions.numberMonth} deleted` };
      }

      async create(dto: GeneralQuestionsDto): Promise<any> {
      try 
      {
        const generalQuestions = await this.generalQuestionsRepository.create(dto);
        await this.generalQuestionsRepository.save(generalQuestions);
        return { message: `The General question ${generalQuestions.typeQuestion+'for age in month:'+ generalQuestions.numberMonth} created` };
      }catch (error)
        {
        throw new NotFoundException({ mesage: 'User ID nout found' });
        } 
      }
      async update(id: string, dto: GeneralQuestionsDto): Promise<any> {
        const generalQuestions = await this.findById(id);
        dto.jsonData
          ? (generalQuestions.jsonData = dto.jsonData)
          : (generalQuestions.jsonData = generalQuestions.jsonData);
        dto.numberMonth
          ? (generalQuestions.numberMonth = dto.numberMonth)
          : (generalQuestions.numberMonth = generalQuestions.numberMonth);
     
        await this.generalQuestionsRepository.save(generalQuestions);
        return { message: `The General question ${generalQuestions.typeQuestion+'for age in month:'+ generalQuestions.numberMonth} updated` };
      }
    

}
