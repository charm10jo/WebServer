import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class SearchLanguageValidationPipe implements PipeTransform{

    readonly LanguageOptions = [1, 2, 3, 4, 5, 6, 7, 8] //8개 언어

    transform(value: any, metadata: ArgumentMetadata){
        console.log('language:', value);
        console.log('metadata:', metadata)
        value = Number(value)

        if(!this.isLanguageValid(value)){
            throw new Error('language 값이 잘못 들어왔어요.')
        }
        return value;
    }

    private isLanguageValid(language: number) {
        const index = this.LanguageOptions.indexOf(language);
        return index !== -1; // true or false
    }
}