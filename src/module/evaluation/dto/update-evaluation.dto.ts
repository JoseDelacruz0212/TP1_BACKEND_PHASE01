import { PartialType } from '@nestjs/swagger';
import { CreateEvaluationDto } from './create-evaluation.dto';

export class UpdateEvaluationDto extends PartialType(CreateEvaluationDto) {
    createdBy: string;
    updatedBy: string;
}
