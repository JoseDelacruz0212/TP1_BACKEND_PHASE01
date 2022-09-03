import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entity/course.entity';
import { Institution } from 'src/entity/institution.entity';
import { User } from 'src/entity/user.entity';
import { Connection, getRepository, In, Repository } from 'typeorm';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import {
  ADMIN_ROLE,
  INSTITUTION_ROLE
} from '../../../config/constants';
import { UserCourse } from 'src/entity/user-course.entity';
@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private repository: Repository<Course>,
    @InjectRepository(Institution) private repositoryInstitution: Repository<Institution>,
    @InjectRepository(UserCourse) private repositoryUserCourse: Repository<UserCourse>,
  ) { }
  //COD COURSE-01
  async create(createCourseDto: CreateCourseDto, user: User) {
    var institution;
    if (createCourseDto.institutionId.length > 0 && user.roles.includes(ADMIN_ROLE)) {
      institution = await this.repositoryInstitution.findOne(createCourseDto.institutionId);
      if (!institution) {
        throw new NotFoundException({
          message: `institution with id=${createCourseDto.institutionId} does not exist`,
        });
      }
    } else {
      if (user.roles.includes(INSTITUTION_ROLE)) {
        institution = await this.repositoryInstitution.findOne(user.institution.id);
        if (!institution) {
          throw new NotFoundException({
            message: `Institution with id does not exist`,
          });
        }
      }
      else {
        throw new UnauthorizedException({
          message: `You are unauthorized to execute this request`,
        });
      }
    }
    const newCourse = this.repository.create(createCourseDto);
    newCourse.institution = institution;
    newCourse.createdBy = user.email;
    newCourse.updatedBy = user.email;
    await this.repository.save(newCourse);
    return { course: newCourse };
  }
  //COD COURSE-02  
  async getAll(userRequest: User) {
    if (userRequest.roles.includes(ADMIN_ROLE)) {
      const courses = await this.repository.find({
        where: {
          isDeleted: false,
        }
      });
      return courses;
    } else {
      if (userRequest.roles.includes(INSTITUTION_ROLE)) {
        const courses = await this.repository.find({
          where: {
            institution: userRequest.institution.id,
            isDeleted: false
          }
        });
        return courses;
      }
      else {
        return this.repository.createQueryBuilder('course')
        .innerJoin('users_courses','uc')
        .where("course.id=uc.courseId")
        .andWhere("uc.userIdUser=:userId", { userId:userRequest.idUser })
        .getMany();
      }
    }
  }
  //COD COURSE-03  
  async getAllByInstitution(id: string, user: User) {
    if (user.roles.includes(ADMIN_ROLE)) {
      const courses = await this.repository.find({
        where: {
          isDeleted: false,
          institution: id
        }
      })
      return courses;
    } else {
      throw new UnauthorizedException();
    }
  }
  //COD COURSE-04  
  async findById(id: string) {
    const course = await this.repository.findOne(id);
    if (!course) {
      throw new NotFoundException({
        message: `Course with id=${id} does not exist`,
      });
    }
    return course;
  }
  //COD COURSE-05
  async update(id: string, updateCourseDto: UpdateCourseDto, user: User) {
    if (user.roles.includes(ADMIN_ROLE) || user.roles.includes(INSTITUTION_ROLE)) {
      var course =await this.findById(id);
      course.name=updateCourseDto.name;
      course.description=updateCourseDto.description;
      course.code=updateCourseDto?.code;
      course.grade=updateCourseDto?.grade;
      course.section=updateCourseDto?.section;
      course.updatedBy=user.email;
      course.updatedOn=new Date();
      await this.repository.update(id, course);
      return { message: 'Course updated' };
    }
    else {
      throw new UnauthorizedException();
    }
  }
  //COD COURSE-06
  async remove(id: string, user: User) {
    if (user.roles.includes(ADMIN_ROLE) || user.roles.includes(INSTITUTION_ROLE)) {
      var course = await this.findById(id);
      course.isDeleted = true;
      const result = await this.repository.update(id, course);
      if (result.affected === 0) {
        throw new NotFoundException({
          message: 'Course to delete does not exist',
        });
      }
      return { message: 'Course deleted' };
    }
    else {
      throw new UnauthorizedException();
    }
  }

}
