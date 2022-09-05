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
import { UserCourseService } from '../service/user-course.service';
import { CreateUserCourseDto } from '../dto/create-user-course.dto';
import { UpdateUserCourseDto } from '../dto/update-user-course.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { userDecorator } from 'src/commom/decorators/user.decorator';
import { User } from 'src/entity/user.entity';

@ApiTags('User-Course')
@Controller('user-course')
export class UserCourseController {
  constructor(private readonly userCourseService: UserCourseService) {}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() createUserCourseDto: CreateUserCourseDto,@userDecorator() user: User) {
    return this.userCourseService.create(createUserCourseDto,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('getAllByCourse/:id')
  async getAllByCourse(@Param('id') id: string,@userDecorator() user: User) {
    return this.userCourseService.getAllByCourse(id,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('getAllByUser/:id')
  async getAllByUser(@Param('id') id: string,@userDecorator() user: User) {
    return this.userCourseService.getAllByUser(id,user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string,@userDecorator() user: User) {
    return this.userCourseService.remove(id,user);
  }
}
