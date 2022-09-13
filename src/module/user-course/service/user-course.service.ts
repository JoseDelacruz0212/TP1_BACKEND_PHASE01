import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entity/course.entity';
import { UserCourse } from 'src/entity/user-course.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserCourseDto } from '../dto/create-user-course.dto';
import { UpdateUserCourseDto } from '../dto/update-user-course.dto';
import {
  ADMIN_ROLE,
  INSTITUTION_ROLE,
  TEACHER_ROLE
} from '../../../config/constants';
@Injectable()
export class UserCourseService {
  constructor(
    @InjectRepository(UserCourse) private repository: Repository<UserCourse>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  async create(createUserCourseDto: CreateUserCourseDto, userRequest: User) {
    if (userRequest.roles.includes(ADMIN_ROLE) || userRequest.roles.includes(INSTITUTION_ROLE)) {
      const user = await this.userRepository.findOne(createUserCourseDto.userId);
      if (!user) {
        throw new NotFoundException({
          message: `User  does not exist`,
        });
      }
      const course = await this.courseRepository.findOne(createUserCourseDto.courseId);
      if (!course) {
        throw new NotFoundException({
          message: `User  does not exist`,
        });
      }
      var userExitsInCourse=this.repository.findOne({where:{
        user:user,
        course:course
      }})
      if(userExitsInCourse){
        throw new Error("El usuario ya ha sido registrado");
      }
      var userCourse:UserCourse;
      const newUserCourse = this.repository.create(userCourse);
      newUserCourse.course = course;
      newUserCourse.updatedBy=userRequest.email;
      newUserCourse.createdBy=userRequest.email;
      newUserCourse.user = user;
 
      await this.repository.save(newUserCourse);
      return { message: 'User assigned' };
    }
    else {
      throw new UnauthorizedException();
    }

  }
  async getAllByCourse(id: string, user: User) {
    if (user.roles.includes(ADMIN_ROLE) || user.roles.includes(INSTITUTION_ROLE)||user.roles.includes(TEACHER_ROLE)) {
      const usersCourses = await this.repository.find({
        where: {
          course: id
        }
      });
      return usersCourses;
    }
    else {
      throw new UnauthorizedException();
    }
  }
  async getAllByUser(id: string, user: User) {
      const usersCourses = await this.repository.find({
        where: {
          user: id
        }
      });
      return usersCourses;
  }
  async remove(id: string, user: User) {
    if(user.roles.includes(ADMIN_ROLE) || user.roles.includes(INSTITUTION_ROLE)){
      const userCourse = await this.findById(id);
      await this.repository.remove(userCourse);
      return { message: 'User removed' };
    }
    else{
      throw new UnauthorizedException();
    }
  
  }
  async findById(id: string) {
    const userCourse = await this.repository.findOne(id);
    if (!userCourse)
      throw new NotFoundException({
        message: `UserCourse with id=${id} does not exist`,
      });
    return userCourse;
  }
}
