import { AuthService } from './../../services/auth/auth.service'
import { Body, Controller, Get, Post } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() credentials: any) {
    return this.authService.login(credentials)
  }
  @Post('/register')
  register(@Body() credentials: any) {
    return this.authService.register(credentials)
  }
}
