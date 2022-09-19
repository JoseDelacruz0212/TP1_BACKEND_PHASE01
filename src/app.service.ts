import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluation } from './entity/evaluation.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Evaluation) private repository: Repository<Evaluation>,

  ) { }

  getHello(): string {
      throw new NotFoundException();
     ;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async evaluationTime(){
    var moment = require('moment');
    var created = moment().format('YYYY-MM-DD HH:mm:ss')

    const listOfEvaluations = await this.repository.find(
      {
        where: {
          availableOn: created,
          isDeleted:false
        }
      });
      listOfEvaluations.map(async x=>{
        if(x.status==1){
          x.status=2;
          await this.repository.update(x.id,x);
        }

      });
  }

}
