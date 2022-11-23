import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: 'Id 안적으심.'})
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    Id: string;

    @IsNotEmpty({message: '비번 안적으심.'})
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    @Matches(/^[a-zA-z0-9]*$/, {
        message: '비번은 영문이나 숫자 1~20자로 지으셔야 해요.'
    })
    password: string;

    @IsNotEmpty({message: '비번확인을 안적으심.'})
    @IsString()
    confirm: string;
    
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    name: string;
    
    @IsOptional()
    @IsNumber()
    gender: number;

    @IsOptional()
    @IsNumber()
    phoneNumber: number;
    
    @IsOptional()
    @IsBoolean()
    korIns: Boolean;

    @IsOptional()
    @IsBoolean()
    privIns: Boolean;

    @IsOptional()
    @IsString()
    birthday: string;
}