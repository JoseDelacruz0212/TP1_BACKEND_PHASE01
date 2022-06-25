import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserCourseDto {
  @ApiProperty()
  @IsNotEmpty()
  createdBy: string;

  @ApiProperty()
  @IsNotEmpty()
  updatedBy: string;

  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  courseId: string;
}
