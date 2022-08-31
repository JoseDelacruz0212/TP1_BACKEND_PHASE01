import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/entity/roles.entity';
import { RoleController } from './controller/role.controller';
import { RoleService } from './service/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
