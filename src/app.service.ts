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
  addMinutes(numOfMinutes, date = new Date()) {
    date.setMinutes(date.getMinutes() + numOfMinutes);
    return date;
  }
  @Cron(CronExpression.EVERY_MINUTE)
  async evaluationEndTime(){
    var moment = require('moment');
    var changeEndEvaluation = moment().format('YYYY-MM-DD HH:mm:ss')

    const listOfEvaluations = await this.repository.find(
      {
        where: {
          isDeleted:false,
          status:2
        }
      });
      listOfEvaluations.map(async x=>{
        const timeNow=this.addMinutes(x.duration,x.availableOn);
        if(moment(changeEndEvaluation).isSameOrAfter(timeNow)){
          x.status=3;
          await this.repository.update(x.id,x);
        }
        
      });
  }
}
