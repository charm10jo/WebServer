//GRS80 타원체 상수
//장반경 (미터)
let a = 6378137
//단반경 (미터)
let b = 6356752.31425
//제1이심률 e*e = (a*a - b*b) / a*a = 0.00669438
let e = 0.00669438
//제2이심률 d*d = (a*a - b*b) / b*b = 0.0067395
let d = 0.0067395
//편평률 (a-b)/a = 1/298.257222101 
//중부원점 : log 127 lat 38
//중부원점 Y축(East) 원점 가산값 
let dY = 200000
//중부원점 X축(North) 원점 가산값 
//let dX = 600000 <- GRS80타원체 EPSG:5186 
let dX = 500000
//원점축척계수 
let k = 1


console.log(0.00669438/(1-0.00669438))
0.99330562


//let lat = 37.2164928333
//let long = 127.033539000
let lat = 37.50532263242871
let long = 127.0168289302183

let T = Math.tan(lat*Math.PI/180) * Math.tan(lat*Math.PI/180)

let C = 0.00669438/(1-0.00669438) * Math.cos(lat*Math.PI/180) * Math.cos(lat*Math.PI/180) 

console.log('T:',T)
console.log('C:',C)

let LZ = 127*Math.PI/180
//람다제로 = 2.21656815
let L =long*Math.PI/180
console.log('람다제로:',LZ)
console.log('람다:',L)

let A = (L-LZ)*Math.cos(lat*Math.PI/180)
console.log('A:',A)

let Atwo = (L-2.21656815)*Math.cos(lat*Math.PI/180)
console.log('A:',Atwo)

let N = a/Math.sqrt(1 - e * Math.sin(lat*Math.PI/180) * Math.sin(lat*Math.PI/180))
console.log('N:',N)

/**
 * M : 자오선장
 */

let fuck = (1 - e/4 - 3*e*e/64 - 5 * e * e* e/256) * (lat*Math.PI/180)
console.log(fuck)
console.log(1 - e/4 - 3*e*e/64 - 5 * e * e* e/256) // 0.9983242984503243
//상수화1
let fuckyou = 0.9983242984503243 * (lat*Math.PI/180)
console.log(fuckyou)

let fucksecond = (3*e/8 + 3*e*e/32 + 45*e*e*e/1024) * Math.sin(2*lat*Math.PI/180)
console.log(fucksecond)
console.log(3*e/8 + 3*e*e/32 + 45*e*e*e/1024) // 0.002514607064228144
//상수화2
let fuckyoutoo = 0.002514607064228144 * Math.sin(2*lat*Math.PI/180)
console.log(fuckyoutoo)


let fuckthird = (15 * e * e / 256 + 45 * e * e * e / 1024) * Math.sin(4*lat*Math.PI/180)
console.log(fuckthird)
console.log(15 * e * e / 256 + 45 * e * e * e / 1024) //0.000002639046602129982
//상수화3
let fuckyouAsshole = 0.000002639046602129982 * Math.sin(4*lat*Math.PI/180)
console.log(fuckyouAsshole)

let fuckforth = (35 * e * e * e / 3072) * Math.sin(6*lat*Math.PI/180)
console.log(fuckforth)
console.log((35 * e * e * e / 3072)) // 3.418046101696858e-9

//상수화4
let fuckyouShitty = 3.418046101696858e-9 * Math.sin(6*lat*Math.PI/180)
console.log(fuckyouShitty)

let M = a * (0.9983242984503243 * (lat*Math.PI/180) - 0.002514607064228144 * Math.sin(2*lat*Math.PI/180) + 0.000002639046602129982 * Math.sin(4*lat*Math.PI/180) - 3.418046101696858e-9 * Math.sin(6*lat*Math.PI/180))
console.log('M',M)


/**
 * Mzero : 위도 37도에서의 M값. 상수.
 */
let Mzero = 4207498.01927

/**
 * Y(E)
 * 
 */
let one = Atwo * Atwo * Atwo / 6 * (1 - T + C)
console.log(one)

let two = Atwo * Atwo * Atwo * Atwo * Atwo / 120 * (5 - 18*T + T*T + 72 * C - 58 * d)
console.log(two)

let Y = dY + k * N * (A + one + two)
console.log('Y:', Y)


/**
 * 
 * X(N)
 */
let won = Atwo * Atwo * Atwo * Atwo / 24 * (5 - T + 9 * C + 4 * C * C)
console.log(won)

let too = Atwo * Atwo * Atwo * Atwo * Atwo * Atwo / 720 * (61 - 58 * T + T * T + 600 * C - 330 * d)
console.log(too)

let X = dX + k * (M - Mzero + (N * Math.tan(lat*Math.PI/180)) * (Atwo * Atwo / 2 + won + too ))
console.log('X:', X)

let X1 = Math.floor(X+1000) 
let X2 = Math.ceil(X-1000)

let Y1 = Math.floor(Y+1000)
let Y2 = Math.floor(Y-1000)
console.log(X1)
console.log(X2)
console.log(Y1)
console.log(Y2)