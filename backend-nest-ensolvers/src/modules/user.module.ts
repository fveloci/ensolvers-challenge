import { UserRepository } from './../repositories/user.repository'
import { UserController } from './../controllers/user/user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './../services/user/user.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
