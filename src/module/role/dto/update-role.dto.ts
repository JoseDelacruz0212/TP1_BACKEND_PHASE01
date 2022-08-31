import { PartialType } from '@nestjs/swagger';
import { CreateRolesDto } from './create-role.dto';

export class UpdateRolesDto extends PartialType(CreateRolesDto) {}
