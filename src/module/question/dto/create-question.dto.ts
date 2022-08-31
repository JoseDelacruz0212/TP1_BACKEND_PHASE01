import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Evaluation } from 'src/entity/evaluation.entity';

export class CreateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  question: string;
  @ApiProperty()
  @IsNotEmpty()
  answer: string;
  @ApiProperty()
  @IsNotEmpty()
  hasAnswer: boolean;
  @ApiProperty()
  @IsNotEmpty()
  type: string;
  @ApiProperty()
  @IsNotEmpty()
  points: number;
  @ApiProperty()
  @IsNotEmpty()
  isSensitive: Boolean;
  @ApiProperty()
  evaluationId: Evaluation;
}
