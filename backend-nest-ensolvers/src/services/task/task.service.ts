import { TaskRepository } from './../../repositories/task.repository'

import { Task } from './../../entities/task.entity'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

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

  async deleteTask(req, taskId: string) {
    let result
    try {
      const task = await this.taskRepository.findOne({
        relations: ['folder'],
        where: {
          id: taskId,
          folder: {
            userId: req.user.id
          }
        }
      })
      if (!task) {
        result = {
          success: false,
          msg: 'Task does not exist or you are not authorized.'
        }
        throw new HttpException(result, HttpStatus.NOT_FOUND)
      }
      await this.taskRepository.delete(taskId)
      result = { success: true, msg: 'Task deleted successfully' }
      return result
    } catch (err) {
      throw err
    }
  }

  async modifyTask(req, taskId: string, newTask: any): Promise<Task> {
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

      if (!task) {
        result = {
          success: false,
          msg: 'Task does not exist or you are not authorized.'
        }
        throw new HttpException(result, HttpStatus.NOT_FOUND)
      }
      const updated = Object.assign(task, newTask)

      return await this.taskRepository.save(updated)
    } catch (err) {
      throw err
    }
  }
}
