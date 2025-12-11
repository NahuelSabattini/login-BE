import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthUserDto {
  @IsString()
  @IsOptional()
  userEmail: string;

  @IsString()
  @IsOptional()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
