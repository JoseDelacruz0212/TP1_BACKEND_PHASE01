import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ACGuard, Role, UseRoles } from "nest-access-control";
import { JwtAuthGuard } from "src/module/auth/guards/jwt-auth.guard";

export function Auth(...Roles: Role[]) {
    return applyDecorators(
      UseGuards(JwtAuthGuard, ACGuard),
      UseRoles(...Roles),
      ApiBearerAuth(),
    );
  }
  