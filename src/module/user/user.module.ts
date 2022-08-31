import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from 'src/entity/institution.entity';
import { User } from 'src/entity/user.entity';
import { InstitutionController } from '../institution/controller/institution.controller';
import { InstitutionService } from '../institution/service/institution.service';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,Institution])],
  controllers: [UserController,InstitutionController],
  providers: [UserService,InstitutionService],
  exports: [UserService],
})
export class UserModule {}
