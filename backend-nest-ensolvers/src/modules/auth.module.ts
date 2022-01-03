import { JwtStrategy } from './../strategy/jwt.strategy'
import { UserModule } from './user.module'
import { AuthService } from './../services/auth/auth.service'
import { jwtConstants } from './../constants'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from 'src/strategy/local.strategy'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
