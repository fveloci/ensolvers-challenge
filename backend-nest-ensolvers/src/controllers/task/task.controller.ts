import { TaskService } from './../../services/task/task.service'
import {
  Controller,
  Get,
  UseGuards,
  Request,
  Delete,
  Req,
  Put,
  Body,
  Param
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'

@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get(':taskId')
  getTask(@Request() req, @Param('taskId') taskId: string) {
    return this.taskService.getTask(req, taskId)
  }

  @Delete(':taskId')
  deleteTask(@Request() req, @Param('taskId') taskId: string) {
    return this.taskService.deleteTask(req, taskId)
  }

  @Put(':taskId')
  modifyTask(
    @Request() req,
    @Param('taskId') taskId: string,
    @Body() newTask: any
  ) {
    return this.taskService.modifyTask(req, taskId, newTask)
  }

  @Put(':taskId/done')
  checkTask(
    @Request() req,
    @Param('taskId') taskId: string,
    @Body() newTask: any
  ) {
    return this.taskService.modifyTask(req, taskId, newTask)
  }
}
