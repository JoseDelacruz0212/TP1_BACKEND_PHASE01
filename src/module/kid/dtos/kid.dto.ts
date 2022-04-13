import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsString, ValidateIf } from "class-validator";
import { User } from "src/entity/user.entity";

export class KidDto {
    idkid?: string;
    @ApiProperty()
    @IsDate()
    @ValidateIf(o=>o.birthDate===null)
    birthDate?: Date;
    @ApiProperty()
    @ValidateIf(o=>o.firstName===null)
    firstName?: string;
    @ApiProperty()
    @ValidateIf(o=>o.lastName===null)
    @IsString()
    lastName?: string;
    @ApiProperty()
    @ValidateIf(o=>o.Gender===null)
    @IsString()
    gender?: string;
    @ApiProperty()
    @ValidateIf(o=>o.dni===null)
    @IsString()
    dni?: string;
    @ApiProperty()
    @ValidateIf(o=>o.User===null)
    UserId: string;
  }
  