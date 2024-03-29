import { Module } from '@nestjs/common';
import { UserCourseService } from './service/user-course.service';
import { UserCourseController } from './controller/user-course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCourse } from '../../entity/user-course.entity';
import { User } from 'src/entity/user.entity';
import { Course } from 'src/entity/course.entity';
import { Institution } from 'src/entity/institution.entity';
import { UserController } from '../user/controller/user.controller';
import { CourseController } from '../course/controller/course.controller';
import { UserService } from '../user/services/user.service';
import { CourseService } from '../course/service/course.service';
import { Evaluation } from 'src/entity/evaluation.entity';
import { Objective } from 'src/entity/objective.entity';
import { Question } from 'src/entity/question.entity';
import { UserEvaluation } from 'src/entity/user-evaluation.entity';
import { UserEvaluationController } from '../user-evaluation/controller/user-evaluation.controller';
import { UserEvaluationService } from '../user-evaluation/service/user-evaluation.service';
@Module({
  imports: [TypeOrmModule.forFeature([Course,Institution,UserCourse,User,Evaluation,Objective,Question,UserEvaluation])],
  controllers: [UserCourseController,UserController,CourseController,UserController,UserEvaluationController],
  providers: [UserCourseService,UserService,CourseService,UserService,UserEvaluationService],
})
export class UserCourseModule {}
