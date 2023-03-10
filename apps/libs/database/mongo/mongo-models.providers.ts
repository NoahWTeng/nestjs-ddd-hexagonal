import { createUserModel } from '@libs/module/user/infrastructure/dao/user.model';
import { Connection } from 'mongoose';
import { MONGO_CONNECTION, USER_MODEL } from './mongo.constant';

export const mongoModelsProviders = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) => createUserModel(connection),
    inject: [MONGO_CONNECTION],
  },
];
