import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class SearchAddressValidationPipe implements PipeTransform{

    readonly AddressOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

    transform(value: any, metadata: ArgumentMetadata){
        console.log('address:', value);
        console.log('metadata:', metadata)
        value = Number(value)

        if(!this.isAddressValid(value)){
            throw new Error('address 값이 잘못 들어왔어요.')
        }
        return value;
    }

    private isAddressValid(address: number) {
        const index = this.AddressOptions.indexOf(address);
        return index !== -1; // true or false
    }
}