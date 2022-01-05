import { UserService } from './../services/user/user.service'
import { AuthController } from './../controllers/auth/auth-controller'
import { JwtStrategy } from './../strategy/jwt.strategy'
import { UserModule } from './user.module'
import { AuthService } from './../services/auth/auth.service'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from 'src/strategy/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.AUTH_SECRET,
      signOptions: { expiresIn: '1d' }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
