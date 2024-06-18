import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/dtos/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {};

  @Post('/register')
  async register(@Body() createUser: CreateUserDTO) {
    return this.authService.register(createUser);
  };

  @Post('/login')
  async login(@Body() login: CreateUserDTO) {
    return this.authService.login(login);
  };
};
