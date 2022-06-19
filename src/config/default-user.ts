import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import {  DEFAULT_USER_EMAIL, DEFAULT_USER_NAME, DEFAULT_USER_PASSWORD, DEFAULT_USER_LASTNAME,DEFAULT_USER_USERNAME} from '../config/constants';
import { User } from 'src/entity/user.entity';

const setDefaultUser = async (config: ConfigService) => {
  const userRepository = getRepository<User>(User);

  const defaultUser = await userRepository
    .createQueryBuilder()
    .where('email = :email', {
      email: config.get<string>('DEFAULT_USER_EMAIL'),
    })
    .getOne();

  if (!defaultUser) {
    const adminUser = userRepository.create({
      name: config.get<string>(DEFAULT_USER_NAME),
      lastName: config.get<string>(DEFAULT_USER_LASTNAME),
      email: config.get<string>(DEFAULT_USER_EMAIL),
      createdBy: config.get<string>(DEFAULT_USER_USERNAME),
      updatedBy:config.get<string>(DEFAULT_USER_USERNAME),
      password: config.get<string>(DEFAULT_USER_PASSWORD),
      roles: ['admin'],
    });

    return await userRepository.save(adminUser);
  }
};

export default setDefaultUser; 
