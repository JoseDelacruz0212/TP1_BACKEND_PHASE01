import { ApiProperty } from "@nestjs/swagger";
import {  IsArray, IsBoolean, IsEmail, IsEnum, isEnum, IsNotEmpty,IsString, ValidateIf } from "class-validator";
import { AppRoles } from "src/app.roles";

export class CreateUserDto {
    IdUser?: string;
    @ApiProperty()
    @IsString()
    @ValidateIf(o=>o.Name===null)
    Name?: string;
    @ApiProperty()
    @ValidateIf(o=>o.LastName===null)
    @IsString()
    LastName?: string;
    @ApiProperty()
    @ValidateIf(o=>o.Email===null)
    Email?: string;
    @ApiProperty()
    @ValidateIf(o=>o.Password===null)
    @IsString()
    Password?: string;
    @ApiProperty()
    @ValidateIf(o=>o.Status===null)
    @IsBoolean()
    Status:boolean;
    @ApiProperty()
    @ValidateIf(o=>o.IsDeleted===null)
    @IsBoolean()
    IsDeleted:boolean;
    @ApiProperty()
    @ValidateIf(o=>o.Roles===null)
    @IsArray()
    @IsEnum(AppRoles,{
        each:true
    })
    Roles: string[];
}
