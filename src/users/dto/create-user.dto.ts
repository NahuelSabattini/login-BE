import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public name: string;

  @IsString()
  public lastName: string;

  @IsEmail()
  public email: string;

  @IsString()
  public userName: string;

  @IsString()
  public password: string;

  @IsString()
  public applicationId: string;
}
