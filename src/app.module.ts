import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from 'nest-access-control';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from './config/constants';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { roles } from './app.roles';
import { CourseModule } from './module/course/course.module';
import { InstitutionModule } from './module/institution/institution.module';
import { UserCourseModule } from './module/user-course/user-course.module';
import { ObjectiveModule } from './module/objective/objective.module';
import { EvaluationModule } from './module/evaluation/evaluation.module';
import { QuestionModule } from './module/question/question.module';
import { RoleModule } from './module/role/role.module';
import { UserRoleModule } from './module/user-evaluation/user-evaluation.module';
import { OptionModule } from './module/option/option.module';
import { MailService } from './module/mail/service/mail.service';
import { MailController } from './module/mail/controller/mail.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { Evaluation } from './entity/evaluation.entity';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(DB_HOST),
        port: +configService.get<number>(DB_PORT),
        username: configService.get(DB_USER),
        password: configService.get(DB_PASSWORD),
        database: configService.get(DB_DATABASE),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, //False:doesn't create a Tables| True:create tables and default User
        legacySpatialSupport: false,
        autoLoadEntities:true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AccessControlModule.forRoles(roles),
    UserModule,
    AuthModule,
    CourseModule,
    InstitutionModule,
    UserCourseModule,
    ObjectiveModule,
    EvaluationModule,
    QuestionModule,
    RoleModule,
    UserRoleModule,
    OptionModule,
    TypeOrmModule.forFeature([Evaluation])
  ],
  controllers: [AppController, MailController],
  providers: [AppService, MailService],
})
export class AppModule {}
