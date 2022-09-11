import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GeneratePoints {
  @ApiProperty()
  @IsNotEmpty()
  evaluationId: string;
  @ApiProperty()
  @IsNotEmpty()
  json:string;
}
