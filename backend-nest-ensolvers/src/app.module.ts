import { AuthModule } from './modules/auth.module'
import { Task } from './entities/task.entity'
import { User } from 'src/entities/user.entity'
import { UserModule } from './modules/user.module'
import { TaskModule } from './modules/task.module'
import { FolderModule } from './modules/folder.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Folder } from './entities/folder.entity'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'todo-nest',
      entities: [Folder, User, Task],
      synchronize: true
    }),
    FolderModule,
    TaskModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
