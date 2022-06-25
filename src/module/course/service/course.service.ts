import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entity/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Injectable()
export class CourseService {

  constructor(@InjectRepository(Course) private repository: Repository<Course>) {}

  async create(createCourseDto: CreateCourseDto) {
    const newCourse = this.repository.create(createCourseDto);
    await this.repository.save(newCourse);
    return { message: 'Course created' }
  }

  async getAll() {
    const courses = await this.repository.find();
    return courses;
  }

  async findById(id: string) {
    const course = await this.repository.findOne(id);
    if (!course) {
      throw new NotFoundException({
        message: `Course with id=${id} does not exist`
      });
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    await this.findById(id);
    await this.repository.update(id, updateCourseDto);
    return { message: 'Course updated' };
  }

  async remove(id: string) {
    const result = await this.repository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException({ message: 'Course to delete does not exist' });
    }

    return { message: 'Course deleted' }
  }
}
