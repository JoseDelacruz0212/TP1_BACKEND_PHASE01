import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { userDecorator } from 'src/commom/decorators/user.decorator';
import { User } from 'src/entity/user.entity';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { CreateEvaluationDto } from '../dto/create-evaluation.dto';
import { GeneratePoints } from '../dto/generate-points.dto';
import { UpdateEvaluationDto } from '../dto/update-evaluation.dto';
import { EvaluationService } from '../service/evaluation.service';
@ApiTags('evaluation')
@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) { }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createEvaluationDto: CreateEvaluationDto, @userDecorator() user: User) {
    return this.evaluationService.create(createEvaluationDto, user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getAll(@userDecorator() user: User) {
    return this.evaluationService.getAll(user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('byCourse/:id')
  async getAllByCourse(@Param('id') id: string, @userDecorator() user: User) {
    return this.evaluationService.getAllByCourse(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEvaluationDto: UpdateEvaluationDto, 
    @userDecorator() user: User
  ) {
    return this.evaluationService.update(id, updateEvaluationDto,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string, @userDecorator() user: User) {
    return this.evaluationService.remove(id,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async getOne(@Param('id') id: string, @userDecorator() user: User) {
    return this.evaluationService.findByEvaluationId(id,user);
  }
  

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('/GeneratePoints')
  async generatePoints(@Body() generatePoints: GeneratePoints, @userDecorator() user: User) {
    return this.evaluationService.generatePoints(generatePoints, user);
  }
}
