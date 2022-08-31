import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from 'src/entity/option.enetity';
import { OptionController } from './controller/option.controller';
import { OptionService } from './service/option.service';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
  controllers: [OptionController],
  providers: [OptionService]
})
export class OptionModule {}
