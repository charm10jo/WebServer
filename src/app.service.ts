import { Injectable } from '@nestjs/common';
import { ConnectionService } from './connection/connection.service';

@Injectable()
export class AppService {
  constructor(private connectionService: ConnectionService) {}

  async getHospital(
    division: number,
    address: number,
    language: number,
    priority: number,
  ) {
    const divisions = [
      'Naes',
      'Woes',
      'Binyos',
      'Sanbus',
      'Seonghyeongs',
      'Soas',
      'Singyeongs',
      'Ans',
      'Ibinhus',
      'Jaehwals',
      'Jeongsins',
      'Jeonghyeongs',
      'Chis',
      'Pibus',
      'Yaks',
      'Hanbangs',
      'Emergencies',
    ];

    const addressArray = [
      '강남구',
      '강동구',
      '강북구',
      '강서구',
      '관악구',
      '광진구',
      '구로구',
      '금천구',
      '노원구',
      '도봉구',
      '동대문구',
      '동작구',
      '마포구',
      '서대문구',
      '서초구',
      '성동구',
      '성북구',
      '송파구',
      '양천구',
      '영등포구',
      '용산구',
      '은평구',
      '종로구',
      '중구',
      '중랑구',
    ];
    const part = divisions[Number(division)];
    const province = addressArray[Number(address)];
    const today = new Date();
    //const dayName = today.toDateString().toLowerCase().split(" ")[0];
    //const timeNow = today.toTimeString().toLowerCase().split(":")[0];
    const dayName = 'mon';
    const timeNow = 10;

    const [hospitals, fields] = await this.connectionService.connection.query(
      `SELECT hospitalName, hospitalSize, phoneNumber, address, mon, tue, wed, thu, fri, sat, sun, holiday, foreignLanguages FROM Emergencies WHERE MATCH(address) AGAINST(?)`,
      [province],
    );
    return hospitals;
  }
}
