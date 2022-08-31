import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InstitutionService } from '../service/institution.service';
import { CreateInstitutionDto } from '../dto/create-institution.dto';
import { UpdateInstitutionDto } from '../dto/update-institution.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { userDecorator } from 'src/commom/decorators/user.decorator';
import { User } from 'src/entity/user.entity';

@ApiTags('Institution')
@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) { }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() createInstitutionDto: CreateInstitutionDto, @userDecorator() user: User) {
    return this.institutionService.create(createInstitutionDto, user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getAll(@userDecorator() user: User) {
    return this.institutionService.getAll(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInstitutionDto: UpdateInstitutionDto,
    @userDecorator() user: User
  ) {
    return this.institutionService.update(id, updateInstitutionDto, user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string, @userDecorator() user: User) {
    return this.institutionService.remove(id, user);
  }
  //Posible
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string, @userDecorator() user: User) {
    return this.institutionService.findById(id);
  }
}
