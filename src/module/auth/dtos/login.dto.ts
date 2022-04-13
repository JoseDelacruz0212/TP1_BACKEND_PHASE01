import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userEmail?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    passwordUser?: string;
}