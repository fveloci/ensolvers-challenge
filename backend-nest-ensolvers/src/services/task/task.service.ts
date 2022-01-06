import { FolderService } from './../folder/folder.service'
import { Task } from './../../entities/task.entity'
import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>
  ) {}

  async getTasksFromFolder(folderId: string): Promise<Task[]> {
    let result
    try {
      return await this.taskRepository.find({
        where: {
          folderId: folderId
        }
      })
    } catch (err) {
      result = { success: false, msg: String(err) }
      throw new HttpException(result, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async createTaskFromFolder(folderId: string, newTask: any): Promise<any> {
    let result
    try {
      console.log(newTask)
      const task = await this.taskRepository.save({
        name: newTask.name,
        done: false,
        folderId: parseInt(folderId)
      })
      return task
    } catch (err) {
      result = { success: false, msg: String(err) }
      throw new HttpException(result, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getTask(req, taskId: string): Promise<Task> {
    let result, task
    try {
      task = await this.taskRepository.findOne({
        relations: ['folder'],
        where: {
          id: taskId,
          folder: {
            userId: req.user.id
          }
        }
      })
      console.log('Task: ', task)
      if (!task) {
        result = {
          success: false,
          msg: 'Task does not exist or you are not authorized to get it,'
        }
        throw new HttpException(result, HttpStatus.NOT_FOUND)
      }
      return task
    } catch (err) {
      throw err
    }
  }

  /*   async deleteTask(req, taskId: string) {
    let result
    try {
      const task = await this.taskRepository.findOne({ where: { id: taskId } })
      if (!task) {
        result = { success: false, msg: 'Task does not exist' }
        throw new HttpException(result, HttpStatus.NOT_FOUND)
      }
      const folders = await this.folderService.findByUser(req.user.id)
      if (folders.some((folder) => folder.id == task.folderId)) {
        await this.taskRepository.delete(taskId)
        result = { success: true, msg: 'Task deleted successfully' }
        return result
      } else {
        result = { success: false, msg: 'Not authorized to get this task' }
        throw new HttpException(result, HttpStatus.UNAUTHORIZED)
      }
    } catch (err) {
      result = { success: false, msg: String(err) }
      throw new HttpException(result, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async modifyTask(req, taskId: string, newTask: any): Promise<Task> {
    let result, task
    try {
      task = await this.taskRepository.findOne({ where: { id: taskId } })

      if (!task) {
        result = {
          success: false,
          msg: 'Task does not exist'
        }
        throw new HttpException(result, HttpStatus.NOT_FOUND)
      }

      const folders = await this.folderService.findByUser(req.user.id)

      if (folders.some((folder) => folder.id == task.folderId)) {
        const updated = Object.assign(task, newTask)

        return await this.taskRepository.save(updated)
      } else {
        result = { success: false, msg: 'Not authorized to get this task' }
        throw new HttpException(result, HttpStatus.UNAUTHORIZED)
      }
    } catch (err) {
      result = { success: false, msg: String(err) }
      throw new HttpException(result, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  } */
}
