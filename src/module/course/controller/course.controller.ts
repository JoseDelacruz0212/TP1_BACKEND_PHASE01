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
import { CourseService } from '../service/course.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { userDecorator } from 'src/commom/decorators/user.decorator';
import { User } from 'src/entity/user.entity';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createCourseDto: CreateCourseDto,@userDecorator() user: User) {
    return this.courseService.create(createCourseDto,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getAll(@userDecorator() user: User) {
    return this.courseService.getAll(user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('byInsitution/:id')
  async getAllCoursesByInstitution(@Param('id') id: string,@userDecorator() user: User) {
    return this.courseService.getAllByInstitution(id,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @userDecorator() user: User
  ) {
    return this.courseService.update(id, updateCourseDto,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string,@userDecorator() user: User) {
    return this.courseService.remove(id,user);
  }
  //Posible
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async getOne(@Param('id') id: string,@userDecorator() user: User) {
    return this.courseService.findById(id);
  }


}
