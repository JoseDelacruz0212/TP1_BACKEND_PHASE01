import { Module } from '@nestjs/common';
import { CourseService } from './service/course.service';
import { CourseController } from './controller/course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entity/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course])
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
