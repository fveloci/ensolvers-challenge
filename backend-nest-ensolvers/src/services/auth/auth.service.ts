import { UserService } from './../user/user.service'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email)
    if (user && user.password === pass) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: any) {
    try {
      const checkedUser = await this.userService.login(user)
      if (checkedUser.success) {
        checkedUser.token = this.jwtService.sign({ user: checkedUser.user })
      } else {
        return checkedUser
      }
      return checkedUser
    } catch (err) {
      throw err
    }
  }

  async register(data: any) {
    const user = await this.userService.registerUser({
      name: data.name,
      password: data.password,
      email: data.email
    })
    return user
  }
}
