import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEvaluationDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  availableOn: Date;

  @ApiProperty()
  @IsNotEmpty()
  duration: number;

  @ApiProperty()
  @IsNotEmpty()
  numberQuestions: number;

  @ApiProperty()
  @IsNotEmpty()
  courseId: string;

}
