import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entity/course.entity';
import { Evaluation } from 'src/entity/evaluation.entity';
import { User } from 'src/entity/user.entity';
import { getRepository, In, Repository } from 'typeorm';
import { CreateEvaluationDto } from '../dto/create-evaluation.dto';
import { UpdateEvaluationDto } from '../dto/update-evaluation.dto';
import { CreateQuestionDto } from '../../question/dto/create-question.dto';
import { NodeForBD, NodeProps, NodeToCompare } from '../model/nodeProps';
import {
  ADMIN_ROLE,
  INSTITUTION_ROLE,
  TEACHER_ROLE
} from '../../../config/constants';
import { Question } from 'src/entity/question.entity';
import { GeneratePoints } from '../dto/generate-points.dto';
import { UserEvaluation } from 'src/entity/user-evaluation.entity';
import {CreateUserEvaluationDto} from'../../user-evaluation/dto/create-user-evaluation.dto';
@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation) private repository: Repository<Evaluation>,
    @InjectRepository(Course) private repositoryCourse: Repository<Course>,
    @InjectRepository(Question) private repositoryQuestion: Repository<Question>,
    @InjectRepository(UserEvaluation) private repositoryUserEvaluation: Repository<UserEvaluation>
  ) { }

  async generatePoints(generatePoints: GeneratePoints, user: User) {
    const evaluation = await this.repository.findOne(generatePoints.evaluationId);
    if (!evaluation) {
      throw new NotFoundException();
    }
    const checkEx=this.findHasEvaluation(evaluation,user);
    if(checkEx){
      throw new UnauthorizedException();
    }
    if (evaluation.json.length > 0) {
      let sumPoints = 0;
      const json = JSON.parse(generatePoints.json);
      const nodes = json["ROOT"]["nodes"] as string[];
      const arrayQuestionUser: CreateQuestionDto[] =[];
      const arrayCodesQuestion: string[]=[];
      nodes
        .map( nodeF => ({ nodeId: nodeF, body: json[nodeF] }))
        .forEach( node => {
          var questionUser = new CreateQuestionDto();
          var answerInput = node.body["props"]!["answerInput"];
          questionUser.answer=answerInput;
          questionUser.code=node.nodeId;
          arrayQuestionUser.push(questionUser);
          arrayCodesQuestion.push(node.nodeId);
        });
      var getQuestions=await this.repositoryQuestion.find({
        where:{
          evaluations:evaluation,
          code:In(arrayCodesQuestion)
        },
        select:['points','answer']
      });
      arrayQuestionUser.map(x=>{
        getQuestions.map(y=>{
          if(x.answer.trim().toUpperCase()==y.answer.trim().toUpperCase()){
            sumPoints+=Number(y.points);
          }
        })
      })
      var dtoUserEvaluation=new CreateUserEvaluationDto();
      var UserEvaluation=await this.repositoryUserEvaluation.create(dtoUserEvaluation);
      UserEvaluation.evaluation=evaluation;
      UserEvaluation.user=user;
      UserEvaluation.createdBy=user.email;
      UserEvaluation.updatedBy=user.email;
      UserEvaluation.json=generatePoints.json;
      UserEvaluation.updatedOn=new Date();
      await this.repositoryUserEvaluation.save(UserEvaluation);
      return { points: sumPoints };
    } else {
      throw new NotFoundException();
    }
  }

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
        where: {
          isDeleted: false
        },
      });
      var ev = evaluations.map(e => {
        const { json, ...rest } = e;
        return rest;
      })
      return ev;
    } else {
      var array = new Array();
      var getListofEvaluations = await this.repository.createQueryBuilder('evaluations')
        .innerJoinAndSelect('users_courses', 'uc')
        .where("evaluations.coursesId=uc.courseId")
        .andWhere("uc.userIdUser=:userId", { userId: user.idUser })
        .andWhere("evaluations.isDeleted=false")
        .getMany();
      getListofEvaluations.forEach(x => {
        array.push(x.id)
      })
      var getParseEvaluations = await this.repository.find({
        where: {
          id: In(array)
        }
      })
      var ev = getParseEvaluations.map(e => {
        const { json, ...rest } = e;
        rest.flag=  this.findHasEvaluation(e,user);
        return rest;
      })
      return ev;
    }
  }
  async update(id: string, updateEvaluationDto: UpdateEvaluationDto, user: User) {
    if (user.roles.includes(ADMIN_ROLE) || user.roles.includes(TEACHER_ROLE) || user.roles.includes(INSTITUTION_ROLE)) {
      const nodesForBD: Question[] = [];
      var evaluation = await this.findById(id);
      if (evaluation.status == 0) {
        evaluation.name = updateEvaluationDto.name;
        evaluation.duration = updateEvaluationDto.duration;
        evaluation.status = updateEvaluationDto.status;
        evaluation.availableOn = updateEvaluationDto.availableOn;
        evaluation.updatedBy = user.email;
        if (updateEvaluationDto.json!=undefined) {
          evaluation.json=updateEvaluationDto.json;
          await this.removeQuestions(evaluation);
          const json = JSON.parse(evaluation.json);
          const nodes = json["ROOT"]["nodes"] as string[];
          nodes
            .map(nodeF => ({ nodeId: nodeF, body: json[nodeF] }))
            .forEach(node => {
              var questionDTO = new CreateQuestionDto();
              questionDTO.answer = node.body["props"]!["answer"];
              questionDTO.hasAnswer = node.body["props"]!["hasAnswer"];
              questionDTO.isSensitive = node.body["props"]!["isCaseSensitive"];
              questionDTO.question = node.body["props"]!["question"];
              questionDTO.points = node.body["props"]!["points"];
              questionDTO.type = node.body["type"]!["resolvedName"];
              questionDTO.code = node.nodeId;
              var questionModel = this.repositoryQuestion.create(questionDTO);
              questionModel.evaluations = evaluation;
              questionModel.createdBy = user.email;
              questionModel.updatedBy = user.email;
              nodesForBD.push(questionModel);
            });
          await this.repositoryQuestion.save(nodesForBD);
        }
        evaluation.updatedOn = new Date();
        await this.repository.update(id, evaluation);

        return { message: 'Evaluation updated' };
      }
      else {
        if (evaluation.status == 1) {
          evaluation.status=2;
          await this.repository.update(id, evaluation);
        }else{
          throw new NotAcceptableException(
                { message: 'No se puede modificar una evaluación ya publicada' }
              );
        }
      }
      //  else {
      //   
      // }
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
  async removeQuestions(evaluation: Evaluation) {
    const evaluations = await this.repositoryQuestion.find({
      where: {
        evaluations: evaluation
      }
    });
    if (evaluations.length > 0)
      await this.repositoryQuestion.remove(evaluations);
    return true;
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
  async findByEvaluationId(id: string, user: User) {
    const evaluation = await this.repository.findOne(id);
    if (user.roles.includes(ADMIN_ROLE) || user.roles.includes(INSTITUTION_ROLE) || user.roles.includes(TEACHER_ROLE)) {
      if (evaluation.status == 0 || evaluation.status == 3) {
        return evaluation;
      } else {
        throw new UnauthorizedException(
          { message: "Examen publicado o iniciado por lo que no puede ser modificado" }
        )
      }
    } else {
      if (evaluation.status == 2) {
        if(evaluation.json.length>0){
          const json = JSON.parse(evaluation.json);
          const nodes = json["ROOT"]["nodes"] as string[];
          nodes
            .map(nodeF => ({ nodeId: nodeF, body: json[nodeF] }))
            .forEach(node => {
              json[node.nodeId]["props"]["answer"] = "";
            });
          evaluation.json = JSON.stringify(json);
          return evaluation;
        }
      }else{
        throw new NotFoundException();
      }
    }
  }

  
   findHasEvaluation(evaluationE:Evaluation,user:User){
    const hasExam= this.repositoryUserEvaluation.findOne({
      where:{
        evaluation:evaluationE,
        user:user
      }
    })
    if(!hasExam){
      return false;
    }
    return true;
  }
}


