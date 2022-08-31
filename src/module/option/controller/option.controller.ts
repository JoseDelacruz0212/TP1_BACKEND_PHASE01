import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOptionDto } from '../dto/create-option.dto';
import { UpdateOptionDto } from '../dto/update-option.dto';
import { OptionService } from '../service/option.service';
@ApiTags('options')
@Controller('option')
export class OptionController {
    constructor(private readonly optionService: OptionService) {}
  
    @Post()
    async create(@Body() createOptionDto: CreateOptionDto) {
      return this.optionService.create(createOptionDto);
    }
  
    @Get()
    async getAll() {
      return this.optionService.getAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.optionService.findById(id);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateOptionDto: UpdateOptionDto,
    ) {
      return this.optionService.update(id, updateOptionDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.optionService.remove(id);
    }
}
