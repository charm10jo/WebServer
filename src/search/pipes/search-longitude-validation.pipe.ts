import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class SearchLongitudeValidationPipe implements PipeTransform{

    transform(value: any, metadata: ArgumentMetadata){
        value = Number(value)

        if(!value){
            return value = 127.01390019329
        }
        return value;
    }

}