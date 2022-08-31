import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateObjectiveDto } from '../dto/create-objective.dto';
import { UpdateObjectiveDto } from '../dto/update-objective.dto';
import { ObjectiveService } from '../service/objective.service';
import { User } from 'src/entity/user.entity';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { userDecorator } from 'src/commom/decorators/user.decorator';
@ApiTags('objectives')
@Controller('objective')
export class ObjectiveController {
  constructor(private readonly ObjectiveService: ObjectiveService) { }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() createObjectiveDto: CreateObjectiveDto,@userDecorator() user: User) {
    return this.ObjectiveService.create(createObjectiveDto,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getAll(@userDecorator() user: User) {
    return this.ObjectiveService.getAll(user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('ByCourse/:id')
  async getAllByCourse(@Param('id') id: string,@userDecorator() user: User) {
    return this.ObjectiveService.getAllByCourse(id,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateObjectiveDto: UpdateObjectiveDto,
    @userDecorator() user: User
  ) {
    return this.ObjectiveService.update(id, updateObjectiveDto,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string,@userDecorator() user: User) {
    return this.ObjectiveService.remove(id,user);
  }
  //posible
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string,@userDecorator() user: User) {
    return this.ObjectiveService.findById(id);
  }
}

