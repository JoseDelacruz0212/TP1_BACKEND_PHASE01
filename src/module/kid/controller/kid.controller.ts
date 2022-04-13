import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Delete,
    Put,
    UseGuards,
    Patch,
    ParseUUIDPipe,
    
  } from '@nestjs/common';
  import {  ApiTags } from '@nestjs/swagger';
  import {  InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
  import { AppResource} from 'src/app.roles';
  import { Auth } from 'src/commom/decorators/auth.decarator';
import { userDecorator } from 'src/commom/decorators/user.decorator';
import { User } from 'src/entity/user.entity';
import { KidDto } from '../dtos/kid.dto';
import { KidService } from '../services/kid.service';
  @ApiTags('Kid')
  @Controller('kid')
export class KidController {
    constructor(private readonly kidService: KidService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder) {}
    @Get()
    async gettAll() {
      return this.kidService.getAll();
    }
    @Get(':id')
    async getOne(@Param('id', ParseUUIDPipe) id: string) {
      return await this.kidService.findById(id);
    }
    @Get('user/:userId')
    async getbyUserId(
      @Param('userId',  ParseUUIDPipe) 
      userId: string) {
      return await this.kidService.findByUserId(userId);
    }
    @Post()
    async create(@Body() dto: KidDto, @userDecorator() user: User) {
      let data;
        data= await this.kidService.create(dto);
      return data;
    }
    
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: string) {
      return await this.kidService.delete(id);
    }
}
