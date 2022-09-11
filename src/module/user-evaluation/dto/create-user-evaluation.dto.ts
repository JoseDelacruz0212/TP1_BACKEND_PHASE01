import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserEvaluationDto {
    @ApiProperty()
    userId: string;
    @ApiProperty()
    evaluationId: string;
    @ApiProperty()
    json: string;
    @ApiProperty()
    points: number;
}
