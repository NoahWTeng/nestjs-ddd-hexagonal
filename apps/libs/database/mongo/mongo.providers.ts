

import { ConfigType } from '@nestjs/config';
import { Connection, createConnection } from 'mongoose';
import { mongodbConfig } from './mongo.config';
import { DATABASE_CONNECTION } from './mongo.constant';


export const mongodbProviders = [
  {
    provide: DATABASE_CONNECTION,
        useFactory: (mongodbConf: ConfigType<typeof mongodbConfig>): Connection => {
      const conn = createConnection(mongodbConf.uri, {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
        //see: https://mongoosejs.com/docs/deprecations.html#findandmodify
        //useFindAndModify: false,
      });
          
      return conn;
    },
    inject: [mongodbConfig.KEY],
  },
];