import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCourseDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    objectivos: string;

    @ApiProperty()
    @IsNotEmpty()
    createdBy: string;

    @ApiProperty()
    @IsNotEmpty()
    updatedBy: string;

    @ApiProperty()
    @IsNotEmpty()
    institutionId: string;
}
