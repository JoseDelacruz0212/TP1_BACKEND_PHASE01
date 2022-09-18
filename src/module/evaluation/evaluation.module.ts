import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from '../mail/service/mail.service';
import { Course } from 'src/entity/course.entity';
import { Evaluation } from 'src/entity/evaluation.entity';
import { Institution } from 'src/entity/institution.entity';
import { Objective } from 'src/entity/objective.entity';
import { Question } from 'src/entity/question.entity';
import { UserCourse } from 'src/entity/user-course.entity';
import { UserEvaluation } from 'src/entity/user-evaluation.entity';
import { User } from 'src/entity/user.entity';
import { CourseController } from '../course/controller/course.controller';
import { CourseService } from '../course/service/course.service';
import { InstitutionController } from '../institution/controller/institution.controller';
import { InstitutionService } from '../institution/service/institution.service';
import { UserEvaluationController } from '../user-evaluation/controller/user-evaluation.controller';
import { UserEvaluationService } from '../user-evaluation/service/user-evaluation.service';
import { EvaluationController } from './controller/evaluation.controller';
import { EvaluationService } from './service/evaluation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course,Institution,UserCourse,User,Evaluation,Objective,Question,UserEvaluation])],
  controllers: [EvaluationController,CourseController,InstitutionController,UserEvaluationController],
  providers: [EvaluationService,CourseService,InstitutionService,UserEvaluationService,MailService]
})
export class EvaluationModule {}
