import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { InstitutionService } from '../service/institution.service';
import { CreateInstitutionDto } from '../dto/create-institution.dto';
import { UpdateInstitutionDto } from '../dto/update-institution.dto';

@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post()
  async create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return this.institutionService.create(createInstitutionDto);
  }

  @Get()
  async getAll() {
    return this.institutionService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.institutionService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateInstitutionDto: UpdateInstitutionDto) {
    return this.institutionService.update(id, updateInstitutionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.institutionService.remove(id);
  }
}
