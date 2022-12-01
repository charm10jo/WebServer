// import { DataSource, DataSourceOptions } from "typeorm";
// import * as config from 'config'
// const dbConfig = config.get('db');

// export const dataSourceOptions: DataSourceOptions = {
//     type: 'mysql',
//     host: dbConfig.host,
//     port: dbConfig.port,
//     username: dbConfig.username,
//     password: dbConfig.password,
//     database: dbConfig.database,
//     //entities: [__dirname + '/**/*.entity{.ts,.js}'],
//     entities: [],
//     synchronize: dbConfig.synchronize,
// }

// const dataSource = new DataSource(dataSourceOptions)


// dataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })
    
// export default dataSource