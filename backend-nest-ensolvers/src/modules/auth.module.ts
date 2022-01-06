import { AuthController } from './../controllers/auth/auth-controller'
import { JwtStrategy } from './../strategy/jwt.strategy'
import { UserModule } from './user.module'
import { AuthService } from './../services/auth/auth.service'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from 'src/strategy/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: await configService.get('AUTH_SECRET')
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
