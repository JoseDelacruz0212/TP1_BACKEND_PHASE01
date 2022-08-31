import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOptionDto {
  @ApiProperty()
  @IsNotEmpty()
  label: string;
  @ApiProperty()
  @IsNotEmpty()
  questionId: string;

}
