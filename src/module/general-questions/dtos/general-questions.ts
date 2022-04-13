import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateIf } from "class-validator";
import { Json } from "sequelize/types/lib/utils";

export class GeneralQuestionsDto {
    id?: string;
    @ApiProperty()
    @ValidateIf(o=>o.typeQuestion===null)
    typeQuestion?: string;
    @ApiProperty()
    @ValidateIf(o=>o.jsonData===null)
    @IsString()
    jsonData?: string;
    @ApiProperty()
    @ValidateIf(o=>o.numberMonth===null)
    numberMonth?: number;
 
  }
  