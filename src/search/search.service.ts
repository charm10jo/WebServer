import { Injectable } from '@nestjs/common';
import { ConnectionService } from '../connection/connection.service';
import { Coordinates } from '../util/coordinates';

@Injectable()
export class SearchService {
  constructor(
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
    const divisions = [
      '내과',
      '외과',
      '비뇨',
      '산부인과',
      '성형외과',
      '소아과',
      '신경',
      '안과',
      '이비인후과',
      '재활의학과',
      '정신건강의학과',
      '정형외과',
      '치과',
      '피부과',
      '약국',
      '한방과',
      '응급실',
    ];

    const languages = [
      null,
      'language1English', 
      'language2ChineseCN', 
      'language3ChineseTW', 
      'language4Vietnamese', 
      'language5Mongolian', 
      'language6Thai', 
      'language7Russian', 
      'language8Kazakh', 
      'language9Japanese'
    ];

    const [Xzero, Xone, Xtwo, Yzero, Yone, Ytwo] =
    this.coordinates.coordination(latitude, longitude);

    const part = divisions[Number(division)];
    const motherTongue = languages[Number(language)]

    /**
     * 위치우선 : 1km 범위로 검색 후 해당 진료과가 없으면 3km 범위로 넓혀 검색합니다.
     * 
     */
    switch (priority) {
      case 1:

        switch (true){
          case division !== 12 && division !==15 && division !==4:
            const localHospital = await this.connectionService.Query(
              'SELECT hospitalName, division, phoneNumber, address, language1English, language2ChineseCN, language3ChineseTW, language4Vietnamese, language5Mongolian, language6Thai, language7Russian, language8Kazakh, language9Japanese, SQRT(POW(x - ? ,2) + POW(y - ?,2)) AS distance FROM (select * from Hospitals where (? < x and x < ? ) and (? < y and y < ?)) H WHERE H.division LIKE ? AND H.division NOT LIKE ? AND H.category NOT LIKE ? AND H.category NOT LIKE ? ORDER BY distance LIMIT 5 ',
              [Xzero, Yzero, Xone, Xtwo, Yone, Ytwo, `%${part}%`, `%성형%`, `치과%`, `한%`],
            );

            if (Array.isArray(localHospital) && localHospital.length !== 0) {
              return localHospital;
            } else if (Array.isArray(localHospital) && localHospital.length === 0) {
              const localHospital =
                await this.connectionService.Query(
                  'SELECT hospitalName, division, phoneNumber, address, language1English, language2ChineseCN, language3ChineseTW, language4Vietnamese, language5Mongolian, language6Thai, language7Russian, language8Kazakh, language9Japanese, SQRT(POW(x - ? ,2) + POW(y - ?,2)) AS distance FROM (select * from Hospitals where  (? < x and x < ? ) and (? < y and y < ?)) H WHERE H.division LIKE ?  AND H.division NOT LIKE ? AND H.category NOT LIKE ? AND H.category NOT LIKE ? ORDER BY distance LIMIT 5 ',
                  [Xzero, Yzero, Xone-2000, Xtwo+2000, Yone-2000, Ytwo+2000, `%${part}%`,`%성형%`, `치과%`, `한%`],
                );
              return localHospital;
            }
            break;     
            
          case division === 12 || division === 15 || division === 4 :
            const localDentistKD = await this.connectionService.Query(
              'SELECT hospitalName, division, phoneNumber, address, language1English, language2ChineseCN, language3ChineseTW, language4Vietnamese, language5Mongolian, language6Thai, language7Russian, language8Kazakh, language9Japanese, SQRT(POW(x - ? ,2) + POW(y - ?,2)) AS distance FROM (select * from Hospitals where (? < x and x < ? ) and (? < y and y < ?)) H WHERE H.division LIKE ? ORDER BY distance LIMIT 5 ',
              [Xzero, Yzero, Xone, Xtwo, Yone, Ytwo, `%${part}%`],
            );
    
            if (Array.isArray(localDentistKD) && localDentistKD.length !== 0) {
              return localDentistKD;
            } else if (Array.isArray(localDentistKD) && localDentistKD.length === 0) {
              const localDentistKD =
                await this.connectionService.Query(
                  'SELECT hospitalName, division, phoneNumber, address, language1English, language2ChineseCN, language3ChineseTW, language4Vietnamese, language5Mongolian, language6Thai, language7Russian, language8Kazakh, language9Japanese, SQRT(POW(x - ? ,2) + POW(y - ?,2)) AS distance FROM (select * from Hospitals where  (? < x and x < ? ) and (? < y and y < ?)) H WHERE H.division LIKE ? ORDER BY distance LIMIT 5 ',
                  [Xzero, Yzero, Xone-2000, Xtwo+2000, Yone-2000, Ytwo+2000, `%${part}%`],
                );
              return localDentistKD;
            }
            break;  
        }
        // const latitude = 37.50532263242871
        // const longitude = 127.0168289302183


      /**
       * 언어우선 : 언어와 위치 조건으로 검색합니다.
       * 5km 안에 해당 언어로 진료하는 병원이 없으면, 서울시 전역으로 넓혀 검색합니다.
       * 그래도 해당 언어로 진료하는 병원이 없으면, 영어진료가 가능한 병원으로 응답합니다.
       */
      case 2:
        const localMotherTongueHospital =
          await this.connectionService.Query(
            `SELECT hospitalName, division, phoneNumber, address, language1English, language2ChineseCN, language3ChineseTW, language4Vietnamese, language5Mongolian, language6Thai, language7Russian, language8Kazakh, language9Japanese, SQRT(POW(x - ? ,2) + POW(y - ?,2)) AS distance FROM (select * from Hospitals where (? < x and x < ? ) and (? < y and y < ?)) H WHERE H.`
            + motherTongue + `=1 AND H.division LIKE ? ORDER BY distance LIMIT 5`,
            [Xzero, Yzero, Xone-4000, Xtwo+4000, Yone-4000, Ytwo+4000, `%${part}%`,],
          );

        switch (true) {
          case Array.isArray(localMotherTongueHospital) && localMotherTongueHospital.length !== 0 :
            return localMotherTongueHospital;

          case Array.isArray(localMotherTongueHospital) && localMotherTongueHospital.length === 0:
            const seoulMotherTongueHospital =
            await this.connectionService.Query(
              `SELECT hospitalName, division, phoneNumber, address, language1English, language2ChineseCN, language3ChineseTW, language4Vietnamese, language5Mongolian, language6Thai, language7Russian, language8Kazakh, language9Japanese, SQRT(POW(x - ? ,2) + POW(y - ?,2)) AS distance FROM Hospitals H WHERE H.`
              + motherTongue + `=1 AND H.division LIKE ? ORDER BY distance LIMIT 5`,
              [Xzero, Yzero, `%${part}%`,],
            );

            if (
              Array.isArray(seoulMotherTongueHospital) &&
              seoulMotherTongueHospital.length !== 0
            ) {
              return seoulMotherTongueHospital;
            } else if (
              Array.isArray(seoulMotherTongueHospital) &&
              seoulMotherTongueHospital.length === 0
            ) {
              const englishHospital =
              await this.connectionService.Query(
                `SELECT hospitalName, division, phoneNumber, address, language1English, language2ChineseCN, language3ChineseTW, language4Vietnamese, language5Mongolian, language6Thai, language7Russian, language8Kazakh, language9Japanese, SQRT(POW(x - ? ,2) + POW(y - ?,2)) AS distance FROM (select * from Hospitals where (? < x and x < ? ) and (? < y and y < ?)) H WHERE H.language1English=1 AND H.division LIKE ? ORDER BY distance LIMIT 5`,
                [Xzero, Yzero, Xone-2000, Xtwo+2000, Yone-2000, Ytwo+2000, `%${part}%`,],
              );
              return englishHospital;
            }
        }
        break;

      /**
       * 응급실 우선
       * 해당 지역의 응급실 운영 병원을 불러옵니다.
       */

      case 3:
        const emergenyHospital =
          await this.connectionService.Query(
          `SELECT hospitalName, division, phoneNumber, address, language1English, language2ChineseCN, language3ChineseTW, language4Vietnamese, language5Mongolian, language6Thai, language7Russian, language8Kazakh, language9Japanese, SQRT(POW(x - ? ,2) + POW(y - ?,2)) AS distance FROM (select * from Hospitals where (? < x and x < ? ) and (? < y and y < ?)) H WHERE H.category LIKE '종합병원' ORDER BY distance LIMIT 5 `,
          [Xzero, Yzero, Xone-4000, Xtwo+4000, Yone-4000, Ytwo+4000],
        );
        return emergenyHospital;

    }
  }
}
