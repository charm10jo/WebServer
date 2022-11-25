import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SearchDto {
    @IsNotEmpty()
    priority : number;

    @IsNumber()
    division : number;

    @IsNumber()
    address : number;

    @IsNumber()
    language : number;


}