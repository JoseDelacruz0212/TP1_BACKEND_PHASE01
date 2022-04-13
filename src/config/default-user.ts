import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DEFAULT_USER_APELLIDO, DEFAULT_USER_BIRTHDATE, DEFAULT_USER_CITY, DEFAULT_USER_COUNTRY, DEFAULT_USER_DIRECTION, DEFAULT_USER_EMAIL, DEFAULT_USER_NAME, DEFAULT_USER_PASSWORD, DEFAULT_USER_PHONE_NUMER, DEFAULT_USER_POSTALCODE } from '../config/constants';
import { User } from 'src/entity/user.entity';

const setDefaultUser = async (config: ConfigService) => {
  const userRepository = getRepository<User>(User);

  const defaultUser = await userRepository
    .createQueryBuilder()
    .where('userEmail = :userEmail', {
        userEmail: config.get<string>('DEFAULT_USER_EMAIL'),
    })
    .getOne();

  if (!defaultUser) {
    const adminUser = userRepository.create({
      userName: config.get<string>(DEFAULT_USER_NAME),
      lastName: config.get<string>(DEFAULT_USER_APELLIDO),
      userEmail: config.get<string>(DEFAULT_USER_EMAIL),
      passwordUser: config.get<string>(DEFAULT_USER_PASSWORD),
      birthdate:config.get<string>(DEFAULT_USER_BIRTHDATE),
      country:config.get<string>(DEFAULT_USER_COUNTRY),
      city:config.get<string>(DEFAULT_USER_CITY),
      direction: config.get<string>(DEFAULT_USER_DIRECTION),
      firstName:config.get<string>(DEFAULT_USER_NAME),
      postal_code:config.get<string>(DEFAULT_USER_POSTALCODE),
      phone_number:config.get<string>(DEFAULT_USER_PHONE_NUMER),
      avatarUrl:config.get<string>(DEFAULT_USER_NAME),
      roles: ['admin'],
    });

    return await userRepository.save(adminUser);
  }
};

export default setDefaultUser; 
