import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import * as config from 'config'
import { Users } from "src/user/entity/user.entity";
const dbConfig = config.get('db');
require('dotenv').config();

export const typeOrmConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || dbConfig.host,
    port: 3306,
    username: process.env.DB_USER || dbConfig.username,
    password:  process.env.DB_PASSWORD || dbConfig.password,
    database: process.env.DB_NAME || dbConfig.database,
    //entities: [__dirname + '/**/*.entity{.ts,.js}'],
    entities: [Users],
    synchronize: dbConfig.synchronize,
}