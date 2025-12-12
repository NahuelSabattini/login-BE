import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('authenticate')
  create(@Body() authUserDto: AuthUserDto) {
    return this.authService.authenticate(authUserDto);
  }

  @Get('validate')
  @HttpCode(HttpStatus.NO_CONTENT)
  validateToken(@Query('jwt') token: string) {
    return this.authService.validateToken(token);
  }
}
