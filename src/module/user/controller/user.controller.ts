
import { Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Delete,
    Body,
    UseGuards,
    Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/commom/decorators/auth.decarator';
import { userDecorator } from 'src/commom/decorators/user.decorator';
import { User } from 'src/entity/user.entity';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';

@ApiTags('User routes')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
      @InjectRolesBuilder()
      private readonly rolesBuilder:RolesBuilder
      ) {}
  
    @Get()
    async gettAll() {
      return this.userService.getAll();
    }
    @Get('admin')
    async gettAllAdmin() {
      return this.userService.gettAllAdmin();
    }
    @Get(':id')
    async getOne(@Param('id', ParseUUIDPipe) id: string) {
      return await this.userService.findById(id);
    }

    @Post()
    async create(@Body() dto: CreateUserDto) {
      return await this.userService.create(dto);
    }
    @Auth(
      {
        possession:'own',
        action:'update',
        resource: AppResource.User 
      }
    )
    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string,
     @Body() dto: CreateUserDto,
     @userDecorator() user: User) 
    {
      let data;
      //esto es admin
      if(this.rolesBuilder.can(user.roles).updateAny(AppResource.User).granted)
      {
         data=await this.userService.update(id, dto);
      }
      //usuario
      else
      {
        const { roles, ...rest } = dto;
         data=await this.userService.update(id, rest, user);
      }
      return {message:'Editado',data}
    }
    @Auth(
      {
        possession:'own',
        action:'update',
        resource: AppResource.User 
      }
    )
    @Patch(':id')
    async updatePartial(@Param('id', ParseUUIDPipe) id: string,
     @Body() dto: CreateUserDto,
     @userDecorator() user: User) 
    {
      let data;
      //esto es admin
      if(this.rolesBuilder.can(user.roles).updateAny(AppResource.User).granted)
      {
         data=await this.userService.updatePartial(id, dto);
      }
      //usuario
      else
      {
        const { roles, ...rest } = dto;
         data=await this.userService.updatePartial(id, rest, user);
      }
      return {message:'Editado',data}
    }
    @Auth({
        possession:'own',
        action:'delete',
        resource: AppResource.User 
      })
    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string,
     @userDecorator() user: User) {
      let data;

      if (this.rolesBuilder.can(user.roles).updateAny(AppResource.User).granted) {
        // esto es un admin
        data = await this.userService.delete(id);
      } else {
        // esto es un usuario
        data = await this.userService.delete(id, user);
      }
      return { message: 'User deleted', data };
    }

}
