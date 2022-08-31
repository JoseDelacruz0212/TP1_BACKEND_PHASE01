import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Objective } from 'src/entity/objective.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateObjectiveDto } from '../dto/create-objective.dto';
import { UpdateObjectiveDto } from '../dto/update-objective.dto';
import {
  ADMIN_ROLE,
  INSTITUTION_ROLE,
  TEACHER_ROLE
} from '../../../config/constants';
import { Course } from 'src/entity/course.entity';
@Injectable()
export class ObjectiveService {
  constructor(
    @InjectRepository(Objective) private respository: Repository<Objective>,
    @InjectRepository(Course) private courseRepositoy: Repository<Course>
  ) { }
  async create(CreateObjectiveDto: CreateObjectiveDto, user: User) {
    if (user.roles.includes(ADMIN_ROLE) || user.roles.includes(INSTITUTION_ROLE) || user.roles.includes(TEACHER_ROLE)) {
      const course=await this.courseRepositoy.findOne(CreateObjectiveDto.courseId);
      if(!course){
        throw new NotFoundException({
          message: 'Course not found',
        });
      }
      const newObjectives = this.respository.create(CreateObjectiveDto);
      newObjectives.createdBy=user.email;
      newObjectives.updatedBy=user.email;
      newObjectives.courses=course;
      await this.respository.save(newObjectives);
      return { newObjectives };
    } else {
      throw new UnauthorizedException({
        message: `Please contact with the administrator to execute this request`,
      });
    }

  }
  async getAllByCourse(id: string, user: User) {
    const Objectives = await this.respository.find({
      where: {
        isDeleted: false,
        courses: id
      }
    });
    return Objectives;
  }
  async getAll(user: User) {
    if (user.roles.includes(ADMIN_ROLE)) {
      const Objectives = await this.respository.find();
      return Objectives;
    }
  }
  async update(id: string, updateObjectivesDto: UpdateObjectiveDto, user: User) {
    if (user.roles.includes(ADMIN_ROLE) || user.roles.includes(INSTITUTION_ROLE) || user.roles.includes(TEACHER_ROLE)) {
      var objective = await this.findById(id);
      objective.name=updateObjectivesDto.name;
      objective.description=updateObjectivesDto.description;
      objective.updatedBy=user.email;
      objective.updatedOn=new Date();
      await this.respository.update(id, objective);
      return { message: 'Objective updated' };
    }
  }

  async remove(id: string, user: User) {
    if (user.roles.includes(ADMIN_ROLE) || user.roles.includes(INSTITUTION_ROLE) || user.roles.includes(TEACHER_ROLE)) {
      var objective = await this.findById(id);
      if (!objective) {
        throw new NotFoundException({
          message: 'Objective not found',
        });
      }
      objective.isDeleted = true;
      await this.respository.update(id, objective);
      return { message: 'Objective deleted' };
    } else {
      throw new UnauthorizedException({
        message: `Please contact with the administrator to execute this request`,
      });
    }
  }
  async findById(id: string) {
    const Objectives = await this.respository.findOne(id);
    if (!Objectives) {
      throw new NotFoundException({
        message: `Objectives with id=${id} does not exist`,
      });
    }

    return Objectives;
  }
}
