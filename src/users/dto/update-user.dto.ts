import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, MaxLength } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @MaxLength(18)
    full_name: string;

    @IsString()
    @MaxLength(18)
    role: string;

    @IsNumber()
    @Max(1000000)
    efficiency: number;
}