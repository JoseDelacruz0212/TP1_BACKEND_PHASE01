import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entity/course.entity';
import { Evaluation } from 'src/entity/evaluation.entity';
import { User } from 'src/entity/user.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateEvaluationDto } from '../dto/create-evaluation.dto';
import { UpdateEvaluationDto } from '../dto/update-evaluation.dto';
import {
  ADMIN_ROLE,
  INSTITUTION_ROLE,
  TEACHER_ROLE
} from '../../../config/constants';
@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation) private repository: Repository<Evaluation>,
    @InjectRepository(Course) private repositoryCourse: Repository<Course>) { }

  async create(createEvaluationDto: CreateEvaluationDto, user: User) {
    if (user.roles.includes(TEACHER_ROLE) || user.roles.includes(INSTITUTION_ROLE) || user.roles.includes(ADMIN_ROLE)) {
      const course = this.repositoryCourse.findOne(createEvaluationDto.courseId);
      if (!course) {
        throw new NotFoundException({
          message: `Course with id=${createEvaluationDto.courseId} does not exist`,
        });
      }
      const newEvaluation = await this.repository.create(createEvaluationDto);
      newEvaluation.courses = (await course);
      newEvaluation.createdBy = user.email;
      newEvaluation.updatedBy = user.email;
      await this.repository.save(newEvaluation);
      return { newEvaluation };
    }
    else {
      throw new UnauthorizedException();
    }
  }
  async getAllByCourse(id: string, user: User) {
    const courses = await this.repository.find({
      where: {
        courses: id,
        isDeleted: false
      }
    })
    return courses;
  }
  async getAll(user: User) {
    if (user.roles.includes(ADMIN_ROLE)) {
      const evaluations = await this.repository.find({
        where:{
          isDeleted:false
        },
      });
      return evaluations;
    }else{
      return this.repository.createQueryBuilder('evaluations')
      .innerJoin('users_courses','uc')
      .where("evaluations.coursesId=uc.courseId")
      .andWhere("uc.userIdUser=:userId", { userId:user.idUser })
      .getRawMany();

    }
  }
  async update(id: string, updateEvaluationDto: UpdateEvaluationDto, user: User) {
    if (user.roles.includes(ADMIN_ROLE) || user.roles.includes(TEACHER_ROLE) || user.roles.includes(INSTITUTION_ROLE)) {
      var evaluation = await this.findById(id);
      if(evaluation.status==0){
        evaluation.name=updateEvaluationDto.name;
        evaluation.duration=updateEvaluationDto.duration;
        evaluation.status=updateEvaluationDto.status;
        evaluation.availableOn=updateEvaluationDto.availableOn;
        evaluation.updatedBy=user.email;
        evaluation.updatedOn=new Date();
        await this.repository.update(id, evaluation);
        return { message: 'Evaluation updated' };
      }else{
        throw new NotAcceptableException(
           { message: 'No se puede modificar una evaluación ya publicada' }
        );
      } 
    }
    else {
      throw new UnauthorizedException();
    }
  }
  async remove(id: string, user: User) {
    if (user.roles.includes(ADMIN_ROLE) || user.roles.includes(TEACHER_ROLE) || user.roles.includes(INSTITUTION_ROLE)) {
      var evaluation = await this.findById(id);
      evaluation.isDeleted = true;
      const result = await this.repository.update(id, evaluation);
      if (result.affected === 0) {
        throw new NotFoundException({
          message: 'Evaluation to delete does not exist',
        });
      }
      return { message: 'Evaluation deleted' };
    } else {
      throw new UnauthorizedException();
    }
  }
  async findById(id: string) {
    const evaluation = await this.repository.findOne(id);
    if (!Evaluation) {
      throw new NotFoundException({
        message: `Evaluation with id=${id} does not exist`,
      });
    }
    return evaluation;
  }
}


