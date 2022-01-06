import { TaskModule } from './task.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FolderService } from './../services/folder/folder.service'
import { FolderController } from './../controllers/folder/folder.controller'
import { forwardRef, Module } from '@nestjs/common'
import { Folder } from 'src/entities/folder.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Folder]), TaskModule],
  providers: [FolderService],
  controllers: [FolderController]
})
export class FolderModule {}
