import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserCourseDto {
    @ApiProperty()
    @IsNotEmpty()
    userId: string;
    @ApiProperty()
    @IsNotEmpty()
    courseId: string;
}
