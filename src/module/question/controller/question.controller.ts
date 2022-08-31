import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { QuestionService } from '../service/question.service';
import { User } from 'src/entity/user.entity';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { userDecorator } from 'src/commom/decorators/user.decorator';
@ApiTags('questions')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto,@userDecorator() user: User) {
    return this.questionService.create(createQuestionDto,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('CreateExam')
  async createExam(@Body() Dto: CreateQuestionDto[],@userDecorator() user: User) {
    return this.questionService.createExam(Dto,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getAll(@userDecorator() user: User) {
    return this.questionService.getAll(user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('byEvaluation/:id')
  async getAllbyEvaluation(   @Param('id') id: string,@userDecorator() user: User) {
    return this.questionService.getAllByEvaluation(id,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @userDecorator() user: User
  ) {
    return this.questionService.update(id, updateQuestionDto,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string,@userDecorator() user: User) {
    return this.questionService.remove(id,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string,@userDecorator() user: User) {
    return this.questionService.findById(id);
  }
}
