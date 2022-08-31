import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entity/course.entity';
import { Evaluation } from 'src/entity/evaluation.entity';
import { Institution } from 'src/entity/institution.entity';
import { Objective } from 'src/entity/objective.entity';
import { Question } from 'src/entity/question.entity';
import { UserCourse } from 'src/entity/user-course.entity';
import { User } from 'src/entity/user.entity';
import { CourseController } from '../course/controller/course.controller';
import { CourseService } from '../course/service/course.service';
import { InstitutionController } from '../institution/controller/institution.controller';
import { InstitutionService } from '../institution/service/institution.service';
import { EvaluationController } from './controller/evaluation.controller';
import { EvaluationService } from './service/evaluation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course,Institution,UserCourse,User,Evaluation,Objective,Question])],
  controllers: [EvaluationController,CourseController,InstitutionController],
  providers: [EvaluationService,CourseService,InstitutionService]
})
export class EvaluationModule {}
