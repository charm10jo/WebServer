import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlModule } from 'nest-mysql2';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SearchModule } from './search/search.module';
import { UserModule } from './user/user.module';
import { typeOrmConfig } from './config/typeorm.config';
import { Users } from "src/user/entity/user.entity";
import * as config from 'config'
import * as dotenv from 'dotenv';
import * as path from 'path';
const dbConfig = config.get('db');


// dotenv.config({
//   path: path.resolve(
//     (process.env.NODE_ENV === 'production') ? '.production.env'
//       : (process.env.NODE_ENV === 'test') ? '.test.env' : '.development.env'
//   )
// });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`]
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST') || dbConfig.host,
          port: 3306,
          username: configService.get('DB_USER') || dbConfig.username,
          database: configService.get('DB_NAME') || dbConfig.database,
          password: configService.get('DB_PASSWORD') || dbConfig.password,
          //entities: [__dirname + '/**/*.entity{.ts,.js}'],
          entities: [Users],
          synchronize: false,
        };
      },
    }),
    UserModule,
    SearchModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}