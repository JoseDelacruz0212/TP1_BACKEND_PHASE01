import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoles } from 'src/entity/user-roles.entity';
import { UserRoleController } from './controller/user-role.controller';
import { UserRoleService } from './service/user-role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoles])],
  controllers: [UserRoleController],
  providers: [UserRoleService]
})
export class UserRoleModule {}
