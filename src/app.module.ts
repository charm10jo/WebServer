import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlModule } from 'nest-mysql2';
import { ConfigModule } from '@nestjs/config';
import { SearchModule } from './search/search.module';
import { UserModule } from './user/user.module';
import { typeOrmConfig } from './configs/typeorm.config';

// dotenv.config({
//   path: path.resolve(
//     (process.env.NODE_ENV === 'production') ? '.production.env'
//       : (process.env.NODE_ENV === 'test') ? '.test.env' : '.development.env'
//   )
// });

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath:
    //     process.env.NODE_ENV === 'devlopment'
    //       ? '.development.env'
    //       : process.env.NODE_ENV === 'test'
    //       ? '.test.env'
    //       : '.production.env',
    // }),

    // MysqlModule.forRoot({
    //   host: process.env.DB_HOST,
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    // }),

    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    SearchModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}