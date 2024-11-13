import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MaxLength(18)
    fullName: string;

    @IsString()
    @MaxLength(18)
    role: string;

    @IsNumber()
    @Max(1000000)
    efficiency: number;
}