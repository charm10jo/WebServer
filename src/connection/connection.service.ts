// import { Injectable, OnModuleInit } from '@nestjs/common';
// import mysql from 'mysql2/promise';

// @Injectable()
// export class ConnectionService implements OnModuleInit {
//   public connection: mysql.Pool;
//   constructor() {}
    
//   async onModuleInit() {
//     this.connection = mysql.createPool({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       port: 3306,
//       database: process.env.DB_NAME,
//       connectionLimit:
//         parseInt(process.env.MYSQL_CONNECTION_LIMIT as string) ?? 50,
//     });
//     console.trace(Error)
//     console.log(`${process.env.DB_HOST} 연결`)
//   }
//   }

