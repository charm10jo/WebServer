import { Injectable } from '@nestjs/common';
import { ConnectionService } from './connection/connection.service';
import { Coordinates } from './util/coordinates';

@Injectable()
export class AppService {
  constructor(
    private connectionService: ConnectionService,
    private coordinates: Coordinates
    ) {}

  async getHospital(
    division: number,
    address: number,
    language: number,
    priority: number,
    latitude: number,
    longitude: number
  ) {
    const divisions = [
      '내과',
      '외과',
      '비뇨기과',
      '산부인과',
      '성형외과',
      '소아과',
      '신경외과',
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
    // const latitude = 37.50532263242871
    // const longitude = 127.0168289302183
    const [Xzero, Xone, Xtwo, Yzero, Yone, Ytwo] = this.coordinates.coordination(latitude, longitude)
    const part = divisions[Number(division)];
    const hospitals = await this.connectionService.Query(
      'SELECT hospitalName, division, phoneNumber, address, language1English, language2ChineseCN, language3ChineseTW, language4Vietnamese, language5Mongolian, language6Thai, language7Russian, language8Kazakh, language9Japanese, SQRT(POW(x - ? ,2) + POW(y - ?,2)) AS distance FROM (select * from Hospitals where (x between ? and ?) and (y between ? and ?)) H WHERE H.division LIKE ? AND H.division NOT LIKE ? ORDER BY distance LIMIT 5 ',
      [Xzero, Yzero, Xone, Xtwo, Yone, Ytwo, `%${part}%`, `%치과%`],
    );
    return hospitals;
  }
}
