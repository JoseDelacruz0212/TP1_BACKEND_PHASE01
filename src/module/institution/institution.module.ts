import { Module } from '@nestjs/common';
import { InstitutionService } from './service/institution.service';
import { InstitutionController } from './controller/institution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from 'src/entity/institution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Institution])],
  controllers: [InstitutionController],
  providers: [InstitutionService],
})
export class InstitutionModule {}
