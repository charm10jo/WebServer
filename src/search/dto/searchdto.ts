import { IsBoolean, IsDecimal, IsLatitude, IsLatLong, IsLongitude, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SearchDto {
    @IsNotEmpty()
    @IsNumber()
    priority : number;

    @IsOptional()
    @IsNumber()
    division : number;

    @IsOptional()
    @IsNumber()
    address : number;

    @IsOptional()
    @IsNumber()
    language : number;

    @IsOptional()
    @IsLatitude()
    latitude : number;
    
    @IsOptional()
    @IsLongitude()
    longitude : number;


}