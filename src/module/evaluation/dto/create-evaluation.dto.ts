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
  status: number;
  @ApiProperty()
  json:string;
  @ApiProperty()
  @IsNotEmpty()
  courseId: string;

}
