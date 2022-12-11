import { Injectable } from '@nestjs/common';
import { SortService } from 'src/util/sort.service';
import { ConnectionService } from '../connection/connection.service';
import { Coordinates } from '../util/coordinates';
import { divisionArray, languageArray } from './dto/search.array'

@Injectable()
export class SearchService {
  constructor(
    private sortService: SortService,
    private connectionService: ConnectionService,
    private coordinates: Coordinates,
  ) {}

  async getHospital(
    division: number,
    language: number,
    priority: number,
    latitude: number,
    longitude: number,
  ) {
    const [Xzero, Xone, Xtwo, Yzero, Yone, Ytwo] =
    this.coordinates.coordination(latitude, longitude);

    const part = divisionArray[Number(division)];
    const motherTongue = languageArray[Number(language)]

    /**
     * 위치우선 : 1km 범위로 검색 후 해당 진료과가 없으면 3km 범위로 넓혀 검색합니다.
     * 
     */
    switch (priority) {
      case 1:

        switch (true){
          case division !== 12 && division !==15 && division !==4:
            const hospitals = await this.connectionService.Query(
              `
              SELECT x, y, hospitalName, division, phoneNumber, address, language1English, language2ChineseCN, language3ChineseTW, language4Vietnamese, language5Mongolian, language6Thai, language7Russian, language8Kazakh, language9Japanese 
              FROM (select * from Hospitals where (? < x and x < ? ) and (? < y and y < ?)) H 
              WHERE ((((H.division LIKE ?) AND H.division NOT LIKE ?) AND H.category NOT LIKE ?) AND H.category NOT LIKE ?)`,
              [Xone, Xtwo, Yone, Ytwo, `%${part}%`, `%성형%`, `치과%`, `한%`],
            );
            const localHospital = this.sortService.sortByDistance(hospitals, Xzero, Yzero)

            if (Array.isArray(localHospital) && localHospital.length !== 0) {
              return localHospital;
            } else if (Array.isArray(localHospital) && localHospital.length === 0) {
              const hospitals =
                await this.connectionService.Query(
                  `
                  SELECT x, y, hospitalName, division, phoneNumber, address, language1English, language2ChineseCN, language3ChineseTW, language4Vietnamese, language5Mongolian, language6Thai, language7Russian, language8Kazakh, language9Japanese 
                  FROM (select * from Hospitals where  (? < x and x < ? ) and (? < y and y < ?)) H 
                  WHERE H.division LIKE ?  AND H.division NOT LIKE ? AND H.category NOT LIKE ? AND H.category NOT LIKE ?`,
                  [Xone-2000, Xtwo+2000, Yone-2000, Ytwo+2000, `%${part}%`,`%성형%`, `치과%`, `한%`],
                );
                const localHospital = this.sortService.sortByDistance(hospitals, Xzero, Yzero)
              return localHospital;
            }
            break;     
            
          case division === 12 || division === 15 || division === 4 :
            const hospitalDKP = await this.connectionService.Query(
              `
              SELECT x, y, hospitalName, division, phoneNumber, address, language1English, language2ChineseCN, language3ChineseTW, language4Vietnamese, language5Mongolian, language6Thai, language7Russian, language8Kazakh, language9Japanese 
              FROM (select * from Hospitals where (? < x and x < ? ) and (? < y and y < ?)) H 
              WHERE H.division LIKE ?`,
              [Xone, Xtwo, Yone, Ytwo, `%${part}%`],
            );
            const localDKP = this.sortService.sortByDistance(hospitalDKP, Xzero, Yzero)
    
            if (Array.isArray(localDKP) && localDKP.length !== 0) {
              return localDKP;
            } else if (Array.isArray(localDKP) && localDKP.length === 0) {
              const hospitalDKP =
                await this.connectionService.Query(
                  `
                  SELECT x, y, hospitalName, division, phoneNumber, address, language1English, language2ChineseCN, language3ChineseTW, language4Vietnamese, language5Mongolian, language6Thai, language7Russian, language8Kazakh, language9Japanese 
                  FROM (select * from Hospitals where  (? < x and x < ? ) and (? < y and y < ?)) H 
                  WHERE H.division LIKE ?`,
                  [Xone-2000, Xtwo+2000, Yone-2000, Ytwo+2000, `%${part}%`],
                );
                const localDKP = this.sortService.sortByDistance(hospitalDKP, Xzero, Yzero)
              return localDKP;
            }
            break;  
        }

      /**
       * 언어우선 : 언어와 위치 조건으로 검색합니다.
       * 5km 안에 해당 언어로 진료하는 병원이 없으면, 서울시 전역으로 넓혀 검색합니다.
       * 그래도 해당 언어로 진료하는 병원이 없으면, 영어진료가 가능한 병원으로 응답합니다.
       */
      case 2:
        const hospitals =
          await this.connectionService.Query(
            `
            SELECT x, y, hospitalName, division, phoneNumber, address, language1English, language2ChineseCN, language3ChineseTW, language4Vietnamese, language5Mongolian, language6Thai, language7Russian, language8Kazakh, language9Japanese 
            FROM (select * from Hospitals where `+ motherTongue +`=1) H
            WHERE (? < H.x and H.x < ? ) AND (? < H.y and H.y < ?) AND H.division LIKE ?`,
            [Xone-4000, Xtwo+4000, Yone-4000, Ytwo+4000, `%${part}%`,],
          );
          const localLanguageHospital = this.sortService.sortByDistance(hospitals, Xzero, Yzero)

        switch (true) {
          case Array.isArray(localLanguageHospital) && localLanguageHospital.length !== 0 :
            return localLanguageHospital;

          case Array.isArray(localLanguageHospital) && localLanguageHospital.length === 0:
            const hospitals =
            await this.connectionService.Query(
              `
              SELECT x, y, hospitalName, division, phoneNumber, address, language1English, language2ChineseCN, language3ChineseTW, language4Vietnamese, language5Mongolian, language6Thai, language7Russian, language8Kazakh, language9Japanese 
              FROM Hospitals H WHERE H.`+ motherTongue + `=1 AND H.division LIKE ?`,
              [`%${part}%`],
            );
            const seoulLanguageHospital = this.sortService.sortByDistance(hospitals, Xzero, Yzero)

            if (
              Array.isArray(seoulLanguageHospital) &&
              seoulLanguageHospital.length !== 0
            ) {
              return seoulLanguageHospital;
            } else if (
              Array.isArray(seoulLanguageHospital) &&
              seoulLanguageHospital.length === 0
            ) {
              const hospitals =
              await this.connectionService.Query(
                `
                SELECT x, y, hospitalName, division, phoneNumber, address, language1English, language2ChineseCN, language3ChineseTW, language4Vietnamese, language5Mongolian, language6Thai, language7Russian, language8Kazakh, language9Japanese 
                FROM (select * from Hospitals where (? < x and x < ? ) and (? < y and y < ?)) H 
                WHERE H.language1English=1 AND H.division LIKE ?`,
                [Xone-2000, Xtwo+2000, Yone-2000, Ytwo+2000, `%${part}%`,],
              );
              const englishHospital = this.sortService.sortByDistance(hospitals, Xzero, Yzero)
              return englishHospital;
            }
        }
        break;

      /**
       * 응급실 우선
       * 해당 지역의 응급실 운영 병원을 불러옵니다.
       */

      case 3:
        const hospitalList =
          await this.connectionService.Query(
          `
          SELECT x, y, hospitalName, division, phoneNumber, address, language1English, language2ChineseCN, language3ChineseTW, language4Vietnamese, language5Mongolian, language6Thai, language7Russian, language8Kazakh, language9Japanese 
          FROM (select * from Hospitals where (? < x and x < ? ) and (? < y and y < ?)) H 
          WHERE H.category LIKE '종합병원'`,
          [Xone-4000, Xtwo+4000, Yone-4000, Ytwo+4000],
        );
        const emergenyHospital = this.sortService.sortByDistance(hospitalList, Xzero, Yzero)
        return emergenyHospital;

    }
  }
}
