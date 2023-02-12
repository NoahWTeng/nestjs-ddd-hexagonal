jest.mock('mongoose', () => ({
  createConnection: jest.fn().mockImplementation((uri: any, options: any) => ({
    close: jest.fn(),
  })),
  Connection: jest.fn(),
}));

import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, createConnection } from 'mongoose';
import { mongodbConfig } from './mongo.config';
import { MONGO_CONNECTION } from './mongo.constant';
import { mongodbProviders } from './mongo.providers';

describe('MongoProvider', () => {
  let conn: Connection;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(mongodbConfig)],
      providers: [...mongodbProviders],
    }).compile();

    conn = module.get<Connection>(MONGO_CONNECTION);
  });

  afterAll(async () => {
    await conn.close();
    await module.close();
  });

  it('MONGO_CONNECTION should be defined', () => {
    expect(conn).toBeDefined();
  });

  it('connect is called', () => {
    expect(createConnection).toHaveBeenCalledWith('mongodb://localhost/test', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      //see: https://mongoosejs.com/docs/deprecations.html#findandmodify
      // useFindAndModify: false
    });
  });
});
