import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  isEnum,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { AppRoles } from 'src/app.roles';

export class CreateUserDto {
  idUser?: string;
  @ApiProperty()
  @IsString()
  @ValidateIf((o) => o.name === null)
  name?: string;
  @ApiProperty()
  @ValidateIf((o) => o.lastName === null)
  @IsString()
  lastName?: string;
  @ApiProperty()
  @ValidateIf((o) => o.email === null)
  email?: string;
  @ApiProperty()
  @ValidateIf((o) => o.password === null)
  @IsString()
  password?: string;
  @ApiProperty()
  @ValidateIf((o) => o.status === null)
  @IsBoolean()
  status: boolean;
  @ApiProperty()
  @ValidateIf((o) => o.isDeleted === null)
  @IsBoolean()
  isDeleted: boolean;
  @ApiProperty()
  @ValidateIf((o) => o.roles === null)
  @IsArray()
  @IsEnum(AppRoles, {
    each: true,
  })
  roles: string[];
}
