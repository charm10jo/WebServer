import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hospitals } from './search.entity';
import { SearchRepository } from './search.repository';
import { InjectDataSource, InjectEntityManager } from "@nestjs/typeorm";
import dataSource from "src/configs/datasource";

@Injectable()
export class SearchService {
  constructor(
    // @InjectRepository(SearchRepository)
    // private searchRepository: SearchRepository,

    @InjectDataSource(dataSource)
    private datasource
  ) {}

  //constructor(@InjectClient() private connection: Connection) {}

  async getAll(
    division: number,
    address: number,
    language: number,
    priority: number,
  ) {
    const divisions = [
      "Naes",
      "Woes",
      "Binyos",
      "Sanbus",
      "Seonghyeongs",
      "Soas",
      "Singyeongs",
      "Ans",
      "Ibinhus",
      "Jaehwals",
      "Jeongsins",
      "Jeonghyeongs",
      "Chis",
      "Pibus",
      "Yaks",
      "Hanbangs",
      "Emergencies",
    ];

    const addressArray = [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ];

    const part = divisions[Number(division)];
    const province = addressArray[Number(address)];
    const dayNow = 'fri';
    const timeNow = 10

    if (priority === 1) {
      //const hospitals = await this.datasource.manager.query(`SELECT * FROM ` + part + ` WHERE address Like ? AND ` + dayNow + ` IS NOT NULL`,[ `%${province}%` ])
      const hospitals = await this.datasource.manager.query(`SELECT * FROM ` + part + ` WHERE MATCH(address) AGAINST(?) AND ` + dayNow + ` IS NOT NULL`,[ province ])
      if (hospitals.length !== 0) {
        return hospitals;
      } else if (hospitals.lenght === 0) {
        const hospitals = await this.datasource.manager.query(`SELECT * FROM Emergencies WHERE MATCH(address) AGAINST('강남구')`)
        return hospitals;
      }
    }

    if (priority === 2) {
      const hospitals = await this.datasource.manager.query(`SELECT * FROM Naes WHERE MATCH(address) AGAINST('강남구') `)
      if (hospitals.length !== 0) {
        return hospitals;
      } else if (hospitals.length === 0) {
        const hospitals = await this.datasource.manager.query(`SELECT * FROM Naes WHERE MATCH(address) AGAINST('강남구')`);

        if (hospitals.length !== 0) {
          return hospitals;
        } else if (hospitals.length === 0) {
          const hospitals = await this.datasource.manager.query(`SELECT * FROM Naes WHERE MATCH(address) AGAINST('강남구')`);
          return hospitals;
        }
      }
    }
    if (priority === 3) {
      const hospitals = await this.datasource.manager.query(`SELECT * FROM Naes WHERE MATCH(address) AGAINST('강남구')`);
      return hospitals;
    }
  }

  // const hospitals = await this.connectionService.connection.query({

  //    sql : `SELECT * FROM Naes WHERE MATCH(address) AGAINST('강남구')`,
  //    //value: {}
  // })
  // const result = Object.assign([{}], hospitals);
}
