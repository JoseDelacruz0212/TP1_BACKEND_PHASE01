import { Module } from '@nestjs/common';
import { UserCourseService } from './service/user-course.service';
import { UserCourseController } from './controller/user-course.controller';

@Module({
  controllers: [UserCourseController],
  providers: [UserCourseService],
})
export class UserCourseModule {}
