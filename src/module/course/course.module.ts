import { Module } from '@nestjs/common';
import { CourseService } from './service/course.service';
import { CourseController } from './controller/course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entity/course.entity';
import { InstitutionService } from '../institution/service/institution.service';
import { InstitutionController } from '../institution/controller/institution.controller';
import { Institution } from 'src/entity/institution.entity';
import { UserCourse } from 'src/entity/user-course.entity';
import { UserCourseController } from '../user-course/controller/user-course.controller';
import { UserCourseService } from '../user-course/service/user-course.service';
import { User } from 'src/entity/user.entity';
import { Evaluation } from 'src/entity/evaluation.entity';
import { Objective } from 'src/entity/objective.entity';
import { Question } from 'src/entity/question.entity';
import { UserEvaluation } from 'src/entity/user-evaluation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course,Institution,UserCourse,User,Evaluation,Objective,Question,UserEvaluation])],
  controllers: [CourseController,UserCourseController],
  providers: [CourseService,InstitutionService,UserCourseService],
})
export class CourseModule {}
