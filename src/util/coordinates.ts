export class Coordinates {
  constructor() {}

  coordination(lat: number, long: number): number[]{
    //GRS80 타원체 상수
    //장반경 (미터)
    const a = 6378137;
    //단반경 (미터)
    const b = 6356752.31425;
    //제1이심률 e*e = (a*a - b*b) / a*a = 0.00669438
    const e = 0.00669438;
    //제2이심률 d*d = (a*a - b*b) / b*b = 0.0067395
    const d = 0.0067395;
    //편평률 (a-b)/a = 1/298.257222101
    //중부원점 : log 127 lat 38
    //중부원점 Y축(East) 원점 가산값
    const dY = 200000;
    //중부원점 X축(North) 원점 가산값
    //놀랍게도 서울시 공공데이터 좌푠 Bessel1841 타원체 EPSG:2097
    const dX = 500000;
    //원점축척계수
    const k = 1;

    let T = Math.tan((lat * Math.PI) / 180) * Math.tan((lat * Math.PI) / 180);
    let C =
      (0.00669438 / (1 - 0.00669438)) *
      Math.cos((lat * Math.PI) / 180) *
      Math.cos((lat * Math.PI) / 180);
    let L = (long * Math.PI) / 180;
    let A = (L - 2.21656815) * Math.cos((lat * Math.PI) / 180);
    let N =
      a /
      Math.sqrt(
        1 -
          e * Math.sin((lat * Math.PI) / 180) * Math.sin((lat * Math.PI) / 180),
      );
    let M =
      a *
      (0.9983242984503243 * ((lat * Math.PI) / 180) -
        0.002514607064228144 * Math.sin((2 * lat * Math.PI) / 180) +
        0.000002639046602129982 * Math.sin((4 * lat * Math.PI) / 180) -
        3.418046101696858e-9 * Math.sin((6 * lat * Math.PI) / 180));
    let Mzero = 4207498.01927;

    /**
     * Y(E)
     *
     */
    let one = ((A * A * A) / 6) * (1 - T + C);

    let two =
      ((A * A * A * A * A) / 120) * (5 - 18 * T + T * T + 72 * C - 58 * d);

    let Y = dY + k * N * (A + one + two);
    console.log('Y:', Y);

    /**
     *
     * X(N)
     */
    let won = ((A * A * A * A) / 24) * (5 - T + 9 * C + 4 * C * C);

    let too =
      ((A * A * A * A * A * A) / 720) *
      (61 - 58 * T + T * T + 600 * C - 330 * d);

    let X =
      dX +
      k *
        (M -
          Mzero +
          N * Math.tan((lat * Math.PI) / 180) * ((A * A) / 2 + won + too));
    console.log('X:', X);

    let Xzero = Math.round(X)
    let Yzero = Math.round(Y)
    let Xone = Math.ceil(X - 1000);
    let Xtwo = Math.floor(X + 1000);
    let Yone = Math.ceil(Y - 1000);
    let Ytwo = Math.floor(Y + 1000);
 

    return [Xzero, Xone, Xtwo, Yzero, Yone, Ytwo];
  }
}
