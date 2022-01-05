import { UserService } from './../../services/user/user.service'
import { Body, Controller, Post } from '@nestjs/common'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
}
