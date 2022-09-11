import { Module } from '@nestjs/common';
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
import { UserEvaluationController } from './controller/user-evaluation.controller';
import { UserEvaluationService } from './service/user-evaluation.service';
import { UserCourseService } from '../user-course/service/user-course.service';
import { UserCourseController } from '../user-course/controller/user-course.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEvaluation,Course,Institution,UserCourse,User,Evaluation,Objective,Question])],
  controllers: [UserEvaluationController,UserCourseController,UserController,CourseController,UserController],
  providers: [UserEvaluationService,UserCourseService,UserService,CourseService,UserService]
})
export class UserRoleModule {}
