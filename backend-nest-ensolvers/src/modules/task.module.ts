import { TaskRepository } from './../repositories/task.repository'
import { TaskController } from './../controllers/task/task.controller'
import { TaskService } from './../services/task/task.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository])],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService]
})
export class TaskModule {}
