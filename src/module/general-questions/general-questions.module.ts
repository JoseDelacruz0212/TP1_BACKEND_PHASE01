import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralQuestions } from 'src/entity/generalQuestions.entity';
import { GeneralQuestionsController } from './controller/general-questions.controller';
import { GeneralQuestionsService } from './services/general-questions.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([GeneralQuestions])
],
  exports:[GeneralQuestionsService],
  controllers: [GeneralQuestionsController],
  providers: [GeneralQuestionsService]
})
export class GeneralQuestionsModule {}
