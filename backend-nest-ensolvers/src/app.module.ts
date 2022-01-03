import { FolderModule } from './modules/folder.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Folder } from './entities/folder.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'todo-nest',
      entities: [Folder],
      synchronize: true
    }),
    FolderModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
