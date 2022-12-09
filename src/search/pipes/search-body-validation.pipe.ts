import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class SearchBodyValidationPipe implements PipeTransform{

    readonly DivisionOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ] //약국, 한방과 포함 17개 진료과
    readonly LanguageOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9] // 9개 언어
    readonly PriorityOptions = [1, 2, 3]

    transform(value: any, metadata: ArgumentMetadata){
        console.log('body:', value);
        console.log('metadata:', metadata)
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
            latitude = 37.508400701487
            longitude = 127.01390019329
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