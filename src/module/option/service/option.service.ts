import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from 'src/entity/option.enetity';
import { Repository } from 'typeorm';
import { CreateOptionDto } from '../dto/create-option.dto';
import { UpdateOptionDto } from '../dto/update-option.dto';

@Injectable()
export class OptionService {
    constructor(
        @InjectRepository(Option) private respository: Repository<Option>,
      ) {}
    
      async create(CreateOptionDto: CreateOptionDto) {
        const newOptions = this.respository.create(CreateOptionDto);
        await this.respository.save(newOptions);
        return { message: 'Options created' };
      }
    
      async getAll() {
        const Options = await this.respository.find();
        return Options;
      }
    
      async findById(id: string) {
        const Options = await this.respository.findOne(id);
        if (!Options) {
          throw new NotFoundException({
            message: `Options with id=${id} does not exist`,
          });
        }
    
        return Options;
      }
    
      async update(id: string, updateOptionsDto: UpdateOptionDto) {
        await this.findById(id);
        await this.respository.update(id, updateOptionsDto);
        return { message: 'Options updated' };
      }
    
      async remove(id: string) {
        const result = await this.respository.delete({ id });
        if (result.affected === 0) {
          throw new NotFoundException({
            message: 'Options to delete does not exist',
          });
        }
    
        return { message: 'Options deleted' };
      }
}
