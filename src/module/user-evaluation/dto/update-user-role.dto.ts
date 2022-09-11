import { PartialType } from '@nestjs/swagger';
import { CreateUserEvaluationDto } from './create-user-evaluation.dto';

export class UpdateUserEvaluationDto extends PartialType(CreateUserEvaluationDto) {}
