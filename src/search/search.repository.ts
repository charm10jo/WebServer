import { DataSource, Repository } from "typeorm";
import { Hospitals } from "./search.entity";
import dataSource from "src/config/datasource";
import { CustomRepository } from "src/util/typeorm-ex.decorator";

@CustomRepository(Hospitals)
export class SearchRepository {

    async getNearest(){
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