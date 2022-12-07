import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class SearchLatitudeValidationPipe implements PipeTransform{

    transform(value: any, metadata: ArgumentMetadata){
        value = Number(value)

        if(!value){
            return value = 37.508400701487
        }
        return value;
    }

}