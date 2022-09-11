import { Module } from '@nestjs/common';
import { InstitutionService } from './service/institution.service';
import { InstitutionController } from './controller/institution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from 'src/entity/institution.entity';
import { Course } from 'src/entity/course.entity';
import { UserCourse } from 'src/entity/user-course.entity';
import { User } from 'src/entity/user.entity';
import { Evaluation } from 'src/entity/evaluation.entity';
import { Objective } from 'src/entity/objective.entity';
import { Question } from 'src/entity/question.entity';
import { UserEvaluation } from 'src/entity/user-evaluation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course,Institution,UserCourse,User,Evaluation,Objective,Question,UserEvaluation])],
  controllers: [InstitutionController],
  providers: [InstitutionService],
})
export class InstitutionModule {}
