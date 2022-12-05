import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SearchModule } from './search/search.module';
import { UserModule } from './user/user.module';
import { Users } from 'src/user/entity/user.entity';
import * as config from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionService } from './connection/connection.service';
import { Coordinates } from './util/coordinates';
const dbConfig = config.get('db');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST') || dbConfig.host,
          port: +configService.get<number>('DB_PORT') || dbConfig.port,
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
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConnectionService, Coordinates],
})
export class AppModule {}
