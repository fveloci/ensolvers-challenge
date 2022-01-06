import { UserRepository } from './../../repositories/user.repository'
import { Injectable } from '@nestjs/common'
import { User } from 'src/entities/user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ email: email })
  }

  async registerUser(user: any): Promise<any> {
    let result
    try {
      const password = user.password
      if (password.length < 6 || password.length > 50) {
        result = {
          success: false,
          msg: 'Password must be between 6 and 50 characters.'
        }
      }
      const encryptedPassword = await bcrypt.hash(
        password,
        Number.parseInt(process.env.AUTH_SALT)
      )

      const userCreated = await this.userRepository.save({
        name: user.name,
        password: encryptedPassword,
        email: user.email
      })
      result = {
        success: true,
        msg: 'User registered successfully',
        user: userCreated
      }
      return result
    } catch (err) {
      result = { success: false, msg: err }
      return result
    }
  }
  async login(body: any): Promise<any> {
    let result, passwordMatches
    try {
      const user = await this.userRepository.findOne({
        where: { email: body.email }
      })
      if (!user) {
        result = { success: false, msg: 'Email does not exist' }
        return result
      }
      passwordMatches = await bcrypt.compare(body.password, user.password)
      if (passwordMatches) {
        result = { success: true, user: user }
        return result
      } else {
        result = { success: false, msg: 'Password is invalid' }
        return result
      }
    } catch (err) {
      result = { success: false, msg: err }
      return result
    }
  }
}
