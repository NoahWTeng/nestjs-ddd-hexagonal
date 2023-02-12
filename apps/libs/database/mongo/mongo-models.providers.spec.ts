import { IUser, UserModel } from '@libs/module/user/infrastructure/dao/user.model';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Model } from 'mongoose';
import { mongoModelsProviders } from './mongo-models.providers';
import { MONGO_CONNECTION, USER_MODEL } from './mongo.constant';

describe('DatabaseModelsProviders', () => {
  let conn: Connection;
  let userModel: UserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ...mongoModelsProviders,

        {
          provide: MONGO_CONNECTION,
          useValue: {
            model: jest.fn().mockReturnValue({} as Model<IUser>),
          },
        },
      ],
    }).compile();

    conn = module.get<Connection>(MONGO_CONNECTION);
    userModel = module.get<UserModel>(USER_MODEL);
  });

  it('MONGO_CONNECTION should be defined', () => {
    expect(conn).toBeDefined();
  });

  it('USER_MODEL should be defined', () => {
    expect(userModel).toBeDefined();
  });
});
