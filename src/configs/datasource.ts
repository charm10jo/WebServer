import { DataSource, DataSourceOptions } from "typeorm";
import * as config from 'config'
const dbConfig = config.get('db');

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || dbConfig.host,
    port: 3306,
    username: process.env.DB_USER || dbConfig.username,
    password: process.env.DB_PASSWORD || dbConfig.password,
    database: process.env.DB_NAME || dbConfig.database,
    //entities: [__dirname + '/**/*.entity{.ts,.js}'],
    entities: [],
    synchronize: dbConfig.synchronize,
}

const dataSource = new DataSource(dataSourceOptions)


dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
    
export default dataSource