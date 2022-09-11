import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { userDecorator } from 'src/commom/decorators/user.decorator';
import { User } from 'src/entity/user.entity';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { CreateUserEvaluationDto } from '../dto/create-user-evaluation.dto';
import { UpdateUserEvaluationDto } from '../dto/update-user-role.dto';
import { UserEvaluationService } from '../service/user-evaluation.service';
@ApiTags('users-evaluations')
@Controller('user-evaluation')
export class UserEvaluationController {
  constructor(private readonly UserEvaluationService: UserEvaluationService) { }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() createUserEvaluationDto: CreateUserEvaluationDto,@userDecorator() user: User) {
    return this.UserEvaluationService.create(createUserEvaluationDto,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async findAll(@userDecorator() user: User) {
    return this.UserEvaluationService.getAll(user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.UserEvaluationService.remove(id);
  }
}
