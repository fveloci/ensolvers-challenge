import { JwtService } from '@nestjs/jwt'
import { JwtStrategy } from './../strategy/jwt.strategy'

import { UserController } from './../controllers/user/user.controller'
import { User } from 'src/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './../services/user/user.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
