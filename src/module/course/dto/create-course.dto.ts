import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Institution } from 'src/entity/institution.entity';

export class CreateCourseDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  code:string;
  @ApiProperty()
  grade:string;
  @ApiProperty()
  section:string;
  @ApiProperty()
  institutionId: string;
}
