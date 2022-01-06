import { FolderRepository } from './../repositories/folder.repository'
import { TaskModule } from './task.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FolderService } from './../services/folder/folder.service'
import { FolderController } from './../controllers/folder/folder.controller'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([FolderRepository]), TaskModule],
  providers: [FolderService],
  controllers: [FolderController]
})
export class FolderModule {}
