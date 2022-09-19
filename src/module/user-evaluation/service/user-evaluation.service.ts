import { Injectable, NotFoundException,UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ADMIN_ROLE, INSTITUTION_ROLE, TEACHER_ROLE } from 'src/config/constants';
import { Evaluation } from 'src/entity/evaluation.entity';
import { UserEvaluation } from 'src/entity/user-evaluation.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserEvaluationDto } from '../dto/create-user-evaluation.dto';
import { UpdateUserEvaluationDto } from '../dto/update-user-role.dto';
@Injectable()
export class UserEvaluationService {
    constructor(
        @InjectRepository(UserEvaluation) private repository: Repository<UserEvaluation>,
        @InjectRepository(Evaluation) private evaluationRepository: Repository<Evaluation>
      ) {}
    
      async create(createUserEvaluationDto: CreateUserEvaluationDto,user:User) {
        const newUserEvaluation = this.repository.create(createUserEvaluationDto);
        const evaluation= await this.evaluationRepository.findOne(newUserEvaluation.evaluation);
        if(!evaluation){
          throw new NotFoundException();
        }
        newUserEvaluation.evaluation=evaluation;
        newUserEvaluation.user=user;
        newUserEvaluation.createdBy=user.email;
        newUserEvaluation.updatedBy=user.email;
        newUserEvaluation.updatedOn= new Date();
        await this.repository.save(newUserEvaluation);
        return {};
      }
      async getAll( evaluationId:string,user:User) {
        if(user.roles.includes(ADMIN_ROLE)||user.roles.includes(INSTITUTION_ROLE)||user.roles.includes(TEACHER_ROLE)){
          const usersEvaluations = await this.repository.find({where:{
            evaluation:evaluationId
          }});
          return usersEvaluations;
        }else{
          const usersEvaluations = await this.repository.find({where:{
            user:user
          }});
          return usersEvaluations;
        }
      }
      async getByUser( evaluationId:string,userId:String,user:User) {
        if(user.roles.includes(ADMIN_ROLE)||user.roles.includes(INSTITUTION_ROLE)||user.roles.includes(TEACHER_ROLE)){
          const usersEvaluations = await this.repository.find({where:{
            evaluation:evaluationId,
            user:userId
          }});
          return usersEvaluations;
        }else{
          const usersEvaluations = await this.repository.find({where:{
            user:user.idUser,
            evaluation:evaluationId
          }});
          return usersEvaluations;
        }
      }
    
      async findById(id: string) {
        const UserEvaluation = await this.repository.findOne(id);
        if (!UserEvaluation)
          throw new NotFoundException({
            message: `UserEvaluation with id=${id} does not exist`,
          });
        return UserEvaluation;
      }
    
      async remove(id: string) {
        const UserEvaluation = await this.findById(id);
        await this.repository.remove(UserEvaluation);
        return {};
      }

      async update(id: string, UpdateUserEvaluationDto: UpdateUserEvaluationDto,user:User) {
        if(user.roles.includes(INSTITUTION_ROLE)||user.roles.includes(TEACHER_ROLE)||user.roles.includes(ADMIN_ROLE)){
          const usersEvaluation = await this.repository.findOne({where:{
            evaluation:UpdateUserEvaluationDto.evaluationId,
            user:UpdateUserEvaluationDto.userId
          }});
          if (!usersEvaluation){
            throw new NotFoundException({
              message: `UserEvaluation with id=${id} does not exist`,
            });
          }
          usersEvaluation.points=UpdateUserEvaluationDto.points;
          await this.repository.update(usersEvaluation.id,usersEvaluation);
          return usersEvaluation;
        }else{
          throw new UnauthorizedException();
        }
    
      }
}
