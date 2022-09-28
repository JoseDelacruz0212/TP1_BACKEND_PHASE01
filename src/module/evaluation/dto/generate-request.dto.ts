import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GenerateRequest {
  @ApiProperty()
  @IsNotEmpty()
  evaluationId: string;
}
