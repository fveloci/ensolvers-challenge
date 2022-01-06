import { FolderModule } from './folder.module'
import { TaskController } from './../controllers/task/task.controller'
import { TaskService } from './../services/task/task.service'
import { Task } from './../entities/task.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService]
})
export class TaskModule {}
