import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCourse } from 'src/entity/user-course.entity';
import { Repository } from 'typeorm';
import { CreateUserCourseDto } from '../dto/create-user-course.dto';
import { UpdateUserCourseDto } from '../dto/update-user-course.dto';

@Injectable()
export class UserCourseService {
  constructor(
    @InjectRepository(UserCourse) private repository: Repository<UserCourse>,
  ) {}

  async create(createUserCourseDto: CreateUserCourseDto) {
    const newUserCourse = this.repository.create(createUserCourseDto);
    await this.repository.save(newUserCourse);
    return { message: 'UserCourse created' };
  }

  async getAll() {
    const usersCourses = await this.repository.find();
    return usersCourses;
  }

  async findById(id: string) {
    const userCourse = await this.repository.findOne(id);
    if (!userCourse)
      throw new NotFoundException({
        message: `UserCourse with id=${id} does not exist`,
      });
    return userCourse;
  }

  async update(id: string, updateUserCourseDto: UpdateUserCourseDto) {
    await this.findById(id);
    await this.repository.update(id, updateUserCourseDto);
    return { message: 'UserCourse updated' };
  }

  async remove(id: string) {
    const userCourse = await this.findById(id);
    userCourse.isDeleted = true;
    await this.repository.save(userCourse);
    return { message: 'UserCourse deleted' };
  }
}
