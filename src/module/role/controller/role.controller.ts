import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { CreateRolesDto } from '../dto/create-role.dto';
import { UpdateRolesDto } from '../dto/update-role.dto';
import { RoleService } from '../service/role.service';
@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() createRoleDto: CreateRolesDto) {
    return this.roleService.create(createRoleDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getAll() {
    return this.roleService.getAll();
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.roleService.findById(id);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRolesDto,
  ) {
    return this.roleService.update(id, updateRoleDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
