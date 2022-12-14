import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { timeStamp } from "console";

export class SearchBodyValidationPipe implements PipeTransform{

    readonly DivisionOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ] //약국, 한방과 포함 17개 진료과
    readonly LanguageOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9] // 9개 언어
    readonly PriorityOptions = [1, 2, 3]
    readonly maxLat = 37.69028824842306; //강동구 강일동 주민센터
    readonly minLat = 37.44824120579107; //개화역
    readonly maxLong = 127.17398134010968; //청계산입구역
    readonly minLong = 126.79526427568551; //도봉산역
    readonly nwLat = 37.60648687324397; //경기도 고양시 망월산
    readonly nwLong = 126.88603589679828; //경기도 고양시 망월산
    readonly neLat = 37.57324344487417; //경기도 구리시 아천동21(아천IC)
    readonly neLong = 127.12842569408078; //경기도 구리시 아천동21(아천IC)
    readonly swLat = 37.46579066450447; //경기도 광명시 도덕산
    readonly swLong = 126.8565886366336; //경기도 광명시 도덕산
    readonly seLat = 37.481442221661155; //경기도 하남시 남한산성
    readonly seLong = 127.18769355136777; //경기도 하남시 남한산성

    transform(value: any, metadata: ArgumentMetadata){
        let priority = Number(value.priority)
        let division = Number(value.division)
        let language = Number(value.language)
        let latitude = Number(value.latitude)
        let longitude = Number(value.longitude)

        if(!this.isPriorityValid(priority)){
            throw new Error('priority 값이 잘못 들어왔어요.')
        } 

        if(!this.isLanguageValid(language)){
            throw new Error('language 값이 잘못 들어왔어요.')
        }

        if(!this.isDivisionValid(division)){
            throw new Error('division 값이 잘못 들어왔어요.')
        }

        if(!latitude || !longitude){
            latitude = 37.508400701487;
            longitude = 127.01390019329;
            return {priority, division, language, latitude, longitude}
        }

        switch(true){
            //서울 북서쪽 예외처리
            case latitude > this.nwLat && longitude < this.nwLong :
                latitude = 37.59028838446531; //은평구신사2동주민센터
                longitude = 126.90823026062183; 
                return {priority, division, language, latitude, longitude}
            
            //서울 북동쪽 예외처리
            case latitude > this.neLat && longitude > this.neLong :
                latitude = 37.56656569827174; //아차산
                longitude = 127.10215412143675;
                return {priority, division, language, latitude, longitude}
            
            //서울 남서쪽 예외처리    
            case latitude < this.swLat && longitude < this.swLong :
                latitude = 37.48671904035457; //구로IC
                longitude = 126.87889117675925;
                return {priority, division, language, latitude, longitude}

            //서울 남동쪽 예외처리
            case latitude < this.neLat && longitude > this.neLong :
                latitude = 37.49561980996604; //마천역
                longitude = 127.15317089766066;
                return {priority, division, language, latitude, longitude}

            //남은 북쪽 예외처리    
            case latitude > this.maxLat :
                latitude = this.maxLat;
                return {priority, division, language, latitude, longitude}
            
            //남은 남쪽 예외처리    
            case latitude < this.minLat :
                latitude = this.minLat;
                return {priority, division, language, latitude, longitude}

            //남은 동쪽 예외처리    
            case longitude > this.maxLong :
                longitude = this.maxLong;
                return {priority, division, language, latitude, longitude}
            
            //남은 서쪽 예외처리    
            case longitude < this.minLong :
                longitude = this.minLong;
                return {priority, division, language, latitude, longitude}
        }
        return {priority, division, language, latitude, longitude}
    }

    private isDivisionValid(division: number) {
        const index = this.DivisionOptions.indexOf(division);
        return index !== -1; // true or false
    }
    private isLanguageValid(language: number) {
        const index = this.LanguageOptions.indexOf(language);
        return index !== -1; // true or false
    }

    private isPriorityValid(priority: number) {
        const index = this.PriorityOptions.indexOf(priority);
        return index !== -1; // trie or false
    }
}