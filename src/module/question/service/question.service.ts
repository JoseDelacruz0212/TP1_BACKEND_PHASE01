import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluation } from 'src/entity/evaluation.entity';
import { Question } from 'src/entity/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import {
  ADMIN_ROLE,
  INSTITUTION_ROLE,
  TEACHER_ROLE
} from '../../../config/constants';
import { User } from 'src/entity/user.entity';
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question) private respository: Repository<Question>,
    @InjectRepository(Evaluation) private respositoryEvaluation: Repository<Evaluation>,
  ) { }

  async create(createQuestionDto: CreateQuestionDto, user: User) {
    if (user.roles.includes(ADMIN_ROLE) || user.roles.includes(INSTITUTION_ROLE) || user.roles.includes(TEACHER_ROLE)) {
      const newQuestions = await this.respository.create(createQuestionDto);
      const Evaluation = await this.respositoryEvaluation.findOne(createQuestionDto.evaluationId);
      if (!Evaluation) {
        throw new NotFoundException();
      }
      newQuestions.evaluations = Evaluation;
      newQuestions.createdBy = user.email;
      newQuestions.updatedBy=user.email;
      await this.respository.save(newQuestions);
    }
    else {
      throw new UnauthorizedException();
    }
  }
  async createExam(dto: CreateQuestionDto[], user: User) {
    if (user.roles.includes(ADMIN_ROLE) || user.roles.includes(INSTITUTION_ROLE) || user.roles.includes(TEACHER_ROLE)) {
      try {
        dto.forEach(res => {
          this.create(res, user);
        });
      }
      catch (error) {
        return { message: 'Error:' + error }
      }
      return{dto}
    }
    else {
      throw new UnauthorizedException();
    }
  }

  async getAll(user: User) {
    if (user.roles.includes(ADMIN_ROLE)) {
      const Questions = await this.respository.find({
        where: {
          isDeleted: false
        }
      });
      return Questions;
    }
    else {
      throw new UnauthorizedException();
    }
  }

  async getAllByEvaluation(evaluationId: string, user: User) {
    const getAllQuestions = await this.respository.find({
      where: {
        evaluations: evaluationId,
        isDeleted: false
      }
    });
    var questions = getAllQuestions.map(question => {
      var filterQuestion = question;
      const { answer, hasAnswer, points, isSensitive, isDeleted, createdBy, updatedBy, ...rest } = filterQuestion;
      return filterQuestion
    })
    return questions;
  }

  async update(id: string, updateQuestionsDto: UpdateQuestionDto, user: User) {
    if (user.roles.includes(ADMIN_ROLE) || user.roles.includes(INSTITUTION_ROLE) || user.roles.includes(TEACHER_ROLE)) {
      var question=await this.findById(id);
      question.question=updateQuestionsDto.question;
      question.answer=updateQuestionsDto.answer;
      question.hasAnswer=updateQuestionsDto.hasAnswer;
      question.type=updateQuestionsDto.type;
      question.points=updateQuestionsDto.points;
      question.isSensitive=updateQuestionsDto.isSensitive;
      question.updatedBy=user.email;
      question.updatedOn=new Date();
      await this.respository.update(id, question);
      return { message: 'Question updated' };
    }
  }

  async remove(id: string, user: User) {
    if (user.roles.includes(ADMIN_ROLE) || user.roles.includes(INSTITUTION_ROLE) || user.roles.includes(TEACHER_ROLE)) {
      const question = await this.findById(id);
      question.isDeleted = true;
      await this.respository.update(id, question);
      return { message: 'Question deleted' };
    }
    else {
      throw new UnauthorizedException();
    }
  }
  async findById(id: string) {
    const Questions = await this.respository.findOne(id);
    if (!Questions) {
      throw new NotFoundException({
        message: `Question with id=${id} does not exist`,
      });
    }
    return Questions;
  }

}
