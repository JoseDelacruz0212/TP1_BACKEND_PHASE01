import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import {  DEFAULT_USER_EMAIL, DEFAULT_USER_NAME, DEFAULT_USER_PASSWORD, DEFAULT_USER_LASTNAME,DEFAULT_USER_USERNAME} from '../config/constants';
import { User } from 'src/entity/user.entity';

const setDefaultUser = async (config: ConfigService) => {
  const userRepository = getRepository<User>(User);

  const defaultUser = await userRepository
    .createQueryBuilder()
    .where('Email = :Email', {
      Email: config.get<string>('DEFAULT_USER_EMAIL'),
    })
    .getOne();

  if (!defaultUser) {
    const adminUser = userRepository.create({
      Name: config.get<string>(DEFAULT_USER_NAME),
      LastName: config.get<string>(DEFAULT_USER_LASTNAME),
      Email: config.get<string>(DEFAULT_USER_EMAIL),
      CreatedBy: config.get<string>(DEFAULT_USER_USERNAME),
      UpdatedBy:config.get<string>(DEFAULT_USER_USERNAME),
      Password: config.get<string>(DEFAULT_USER_PASSWORD),
      Roles: ['admin'],
    });

    return await userRepository.save(adminUser);
  }
};

export default setDefaultUser; 
