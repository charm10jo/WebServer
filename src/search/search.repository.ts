import { DataSource, Repository } from "typeorm";
import { Hospitals } from "./search.entity";
import { EntityManager } from 'typeorm';
import { InjectDataSource, InjectEntityManager } from "@nestjs/typeorm";
import dataSource from "src/configs/datasource";
import { Connection } from "mysql2/promise";
import { CustomRepository } from "src/util/typeorm-ex.decorator";

// const UserRepository = myDataSource.getRepository(UserEntity)
@CustomRepository(Hospitals)
export class SearchRepository {

    async getNearest(){
        const result = await dataSource.manager.query(`SELECT * FROM Naes WHERE MATCH(address) AGAINST('강남구')`)
        return result;
    }

    async getNearestForeignLanguage(division, address, language){

    }

    async getSeoulForeignLanguage(division, language){

    }

    async getEnglish(division, address){

    }

    async getNearestEmergency(address){

    }
}