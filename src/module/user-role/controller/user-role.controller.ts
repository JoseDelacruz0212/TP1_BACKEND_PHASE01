import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { CreateUserRoleDto } from '../dto/create-user-role.dto';
import { UpdateUserRolesDto } from '../dto/update-user-role.dto';
import { UserRoleService } from '../service/user-role.service';
@ApiTags('users-roles')
@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) { }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.create(createUserRoleDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async findAll() {
    return this.userRoleService.getAll();
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userRoleService.findById(id);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRolesDto,
  ) {
    return this.userRoleService.update(id, updateUserRoleDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userRoleService.remove(id);
  }
}
