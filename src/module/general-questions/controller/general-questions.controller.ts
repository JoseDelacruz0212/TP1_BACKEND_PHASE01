import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Delete,
    Put,
    UseGuards,
    Patch,
    ParseUUIDPipe,
    
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { GeneralQuestionsDto } from '../dtos/general-questions';
import { GeneralQuestionsService } from '../services/general-questions.service';
@ApiTags('General-Questionnare')
@Controller('general-questions')
export class GeneralQuestionsController {
    constructor(private readonly generalQuestionServices: GeneralQuestionsService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder) {}
        @Get()
        async gettAll() {
          return this.generalQuestionServices.getAll();
        }
        @Get(':id')
        async getOne(@Param('id', ParseUUIDPipe) id: string) {
          return await this.generalQuestionServices.findById(id);
        }
        @Post()
        async create(@Body() dto: GeneralQuestionsDto) {
          let data;
            data= await this.generalQuestionServices.create(dto);
          return data;
        }
        @Delete(':id')
        async delete(@Param('id', ParseIntPipe) id: string) {
          return await this.generalQuestionServices.delete(id);
        }
}
