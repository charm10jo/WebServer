import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class SearchPriorityValidationPipe implements PipeTransform{

    readonly PriorityOptions = [1, 2, 3]

    transform(value: any, metadata: ArgumentMetadata){
        console.log('priority:', value);
        console.log('metadata:', metadata);
        value = Number(value)

        if(!this.isPriorityValid(value)){
            throw new Error('priority 값이 잘못 들어왔어요.')
        } 
        return value;
    }

    private isPriorityValid(priority: number) {
        const index = this.PriorityOptions.indexOf(priority);
        return index !== -1; // trie or false
    }
}