import { ApiProperty } from "@nestjs/swagger";
import {  IsArray, IsBoolean, IsEmail, IsEnum, isEnum, IsNotEmpty,IsString, ValidateIf } from "class-validator";
import { AppRoles } from "src/app.roles";

export class CreateUserDto {
    iduser?: string;
    @ApiProperty()
    @IsString()
    @ValidateIf(o=>o.userName===null)
    userName?: string;
    @ApiProperty()
    @ValidateIf(o=>o.firstName===null)
    @IsString()
    firstName?: string;
    @ApiProperty()
    @ValidateIf(o=>o.firstName===null)
    birthdate?: Date;
    @ApiProperty()
    @ValidateIf(o=>o.lastName===null)
    @IsString()
    lastName?: string;
    @ApiProperty()
    @ValidateIf(o=>o.direction===null)
    @IsString()
    direction?: string;
    @ApiProperty()
    @ValidateIf(o=>o.city===null)
    @IsString()
    city?: string;
    @ApiProperty()
    @ValidateIf(o=>o.country===null)
    @IsString()
    country?: string;
    @ApiProperty()
    @ValidateIf(o=>o.postal_code===null)
    @IsString()
    postal_code?: string;
    @ApiProperty()
    @ValidateIf(o=>o.phone_number===null)
    @IsString()
    phone_number?: string;
    @ApiProperty()
    @ValidateIf(o=>o.userEmail===null)
    @IsEmail()
    userEmail?: string;
    @ApiProperty()
    @ValidateIf(o=>o.avatarUrl===null)
    @IsEmail()
    avatarUrl?: string;
    @ApiProperty()
    @ValidateIf(o=>o.passwordUser===null)
    @IsString()
    passwordUser?: string;
    @ApiProperty()
    @ValidateIf(o=>o.status===null)
    @IsBoolean()
    status:boolean;
    @ApiProperty()
    @ValidateIf(o=>o.roles===null)
    @IsArray()
    @IsEnum(AppRoles,{
        each:true
    })
    roles: string[];
}
