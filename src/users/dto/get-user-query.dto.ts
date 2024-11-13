import { Transform } from 'class-transformer';
import { IsOptional, IsBoolean, IsNumberString, MaxLength } from 'class-validator';

export class GetUserQueryDto {
  @IsOptional()
  role?: string;

  @IsOptional()
  fullName?: string;

  @IsOptional()
  @Transform(({ value }) => +value)
  efficiency?: number;
}