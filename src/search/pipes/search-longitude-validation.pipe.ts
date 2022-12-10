import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class SearchLongitudeValidationPipe implements PipeTransform{
    readonly maxLong = 127.17398134010968;
    readonly minLong = 126.79526427568551;
    //readonly avgLong
    //readonly defaultDifference

    transform(value: any, metadata: ArgumentMetadata){
        value = Number(value)

        if(!value){
            return value = 127.01390019329
        }

        switch(true){
            case value > this.maxLong :
                return value = this.maxLong;
            
            case value < this.minLong :
                return value = this.minLong;
        }

        return value;
    }

}


/**
 * 
 * 서울좌표 범위 : 일부러 다소 좁게 잡았습니다.
 * 남 청계산입구역, 북 도봉산역, 서 개화역, 동 강일동 주민센터
 * lat 37.44824120579107 ~ 37.69028824842306, long 126.79526427568551 ~ 127.17398134010968 
 * avglat 37.5692647271, avglong 126.984622808
 * 0~3018390 + 371114550,  0~5352250 + 1261988610
 * 
 * 
 */