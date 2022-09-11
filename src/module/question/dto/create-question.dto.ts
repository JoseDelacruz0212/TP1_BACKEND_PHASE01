import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Evaluation } from 'src/entity/evaluation.entity';

export class CreateQuestionDto {
  @ApiProperty()
  question: string;
  @ApiProperty()
  answer: string;
  @ApiProperty()
  hasAnswer: boolean;
  @ApiProperty()
  type: string;
  @ApiProperty()
  points: number;
  @ApiProperty()
  isSensitive: Boolean;
  @ApiProperty()
  evaluationId: string;
}
