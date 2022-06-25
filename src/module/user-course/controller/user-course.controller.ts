import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserCourseService } from '../service/user-course.service';
import { CreateUserCourseDto } from '../dto/create-user-course.dto';
import { UpdateUserCourseDto } from '../dto/update-user-course.dto';

@Controller('user-course')
export class UserCourseController {
  constructor(private readonly userCourseService: UserCourseService) {}

  @Post()
  async create(@Body() createUserCourseDto: CreateUserCourseDto) {
    return this.userCourseService.create(createUserCourseDto);
  }

  @Get()
  async findAll() {
    return this.userCourseService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userCourseService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserCourseDto: UpdateUserCourseDto,
  ) {
    return this.userCourseService.update(id, updateUserCourseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userCourseService.remove(id);
  }
}
