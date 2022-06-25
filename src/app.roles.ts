import { RolesBuilder } from 'nest-access-control';
export enum AppRoles {
  user = 'user',
  admin = 'admin',
}
export enum AppResource {
  User = 'user',
}
export const roles: RolesBuilder = new RolesBuilder();
roles
  // User Roles
  .grant(AppRoles.user)
  .updateOwn(AppResource.User)
  .deleteOwn(AppResource.User)
  // admin Roles
  .grant(AppRoles.admin)
  .extend(AppRoles.user)
  .createOwn(AppResource.User)
  .updateAny(AppResource.User)
  .deleteAny(AppResource.User);
