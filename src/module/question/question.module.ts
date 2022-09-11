import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entity/course.entity';
import { Evaluation } from 'src/entity/evaluation.entity';
import { Institution } from 'src/entity/institution.entity';
import { Objective } from 'src/entity/objective.entity';
import { Question } from 'src/entity/question.entity';
import { UserCourse } from 'src/entity/user-course.entity';
import { UserEvaluation } from 'src/entity/user-evaluation.entity';
import { User } from 'src/entity/user.entity';
import { EvaluationController } from '../evaluation/controller/evaluation.controller';
import { EvaluationService } from '../evaluation/service/evaluation.service';
import { QuestionController } from './controller/question.controller';
import { QuestionService } from './service/question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course,Institution,UserCourse,User,Evaluation,Objective,Question,UserEvaluation])],
  controllers: [QuestionController,EvaluationController],
  providers: [QuestionService,EvaluationService]
})
export class QuestionModule {}
