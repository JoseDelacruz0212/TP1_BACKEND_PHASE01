import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
  Patch,
  Request
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
  constructor(
    private readonly userService: UserService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) { }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req) {
    return req.user;
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('all')
  async gettAll(@userDecorator() user: User) {
    return this.userService.getAll(user);
  }

  @Get('admin')
  async gettAllAdmin() {
    return this.userService.gettAllAdmin();
  }
  @Get(':id')
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.findById(id);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() dto: CreateUserDto, @userDecorator() user: User) {
    return await this.userService.create(dto, user);
  }
  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResource.User,
  })
  @Put('AssignInstitution/:id/:institutionId')
  async assingInsitution(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('institutionId', ParseUUIDPipe) institutionId: string,
    @Body() dto: CreateUserDto,
    @userDecorator() user: User,
  ) {
    let data;
    //esto es admin
    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.User).granted) {
      data = await this.userService.assignInstitution(id, institutionId);
    }
  }


  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResource.User,
  })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateUserDto,
    @userDecorator() user: User,
  ) {
    let data;
    //esto es admin
    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.User).granted) {
      data = await this.userService.update(id, dto);
    }
    //usuario
    else {
      const { roles, ...rest } = dto;
      data = await this.userService.update(id, rest, user);
    }
    return { message: 'Edited', data };
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  async updatePartial(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateUserDto,
    @userDecorator() user: User,
  ) {
   let data = await this.userService.updatePartial(id, dto, user);
    return { message: 'Edited' };
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('updateAvatar/:id')
  async updateAvatar(
    @Param('id') id: string,
    @Body() dto: CreateUserDto,
    @userDecorator() user: User,
  ) {
    let data;
    data = await this.userService.updateAvatar(dto,user);
    return { message: 'Edited', data };
  }
  @Auth({
    possession: 'own',
    action: 'delete',
    resource: AppResource.User,
  })
  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @userDecorator() user: User,
  ) {
    let data;

    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.User).granted) {
      // esto es un admin
      data = await this.userService.delete(id, user);
    } else {
      // esto es un usuario
      data = await this.userService.delete(id, user);
    }
    return { message: 'User deleted', data };
  }
}
