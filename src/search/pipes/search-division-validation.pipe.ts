import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class SearchDivisionValidationPipe implements PipeTransform{

    readonly DivisionOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ] //약국, 한방과 포함 17개 진료과

    transform(value: any, metadata: ArgumentMetadata){
        console.log('division:', value);
        console.log('metadata:', metadata)
        value = Number(value)

        if(!this.isDivisionValid(value)){
            throw new Error('division 값이 잘못 들어왔어요.')
        }
        return value;
    }

    private isDivisionValid(division: number) {
        const index = this.DivisionOptions.indexOf(division);
        return index !== -1; // true or false
    }
}