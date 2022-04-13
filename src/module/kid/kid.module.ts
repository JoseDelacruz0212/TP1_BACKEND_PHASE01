import { Module } from '@nestjs/common';
import { KidController } from './controller/kid.controller';
import { KidService } from './services/kid.service';
import { Kid } from 'src/entity/kid.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
@Module({
    imports:[
        TypeOrmModule.forFeature([Kid,User])
    ],
   exports:[KidService],
    controllers: [KidController],
  providers: [KidService]
})
export class KidModule {}