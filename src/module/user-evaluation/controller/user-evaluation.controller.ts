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
  @Get('ByEvaluation/:id')
  async findByEvaluation(@Param('id') id: string,@userDecorator() user: User) {
    return this.UserEvaluationService.getAll(id,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('byUser/:evaluationId/:userId')
  async findByUserAndEvaluation(@Param('evaluationId') evaluationId: string,@Param('userId') userId: string,@userDecorator() user: User) {
    return this.UserEvaluationService.getByUser(evaluationId,userId,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() UpdateUserEvaluationDto: UpdateUserEvaluationDto,
    @userDecorator() user: User
  ) {
    return this.UserEvaluationService.update(id, UpdateUserEvaluationDto,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.UserEvaluationService.remove(id);
  }
}
