import { FolderRepository } from './../../repositories/folder.repository'
import { TaskService } from './../task/task.service'
import { FolderDto } from './../../dtos/folder.dto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Folder } from 'src/entities/folder.entity'

@Injectable()
export class FolderService {
  constructor(
    private folderRepository: FolderRepository,
    private taskService: TaskService
  ) {}

  async findByUser(req): Promise<Folder[]> {
    let result, folders
    try {
      folders = await this.folderRepository.find({
        where: { userId: req.user.id }
      })

      return folders
    } catch (err) {
      result = { success: false, msg: String(err) }
      throw new HttpException(result, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findFolder(folderId: string): Promise<Folder> {
    return await this.folderRepository.findOne(folderId)
  }

  async createFolder(req, newFolder: FolderDto): Promise<any> {
    let folder, result
    console.log(req.user)
    try {
      if (req.user.id) {
        folder = await this.folderRepository.save({
          name: newFolder.name,
          userId: req.user.id
        })
      }
      return folder
    } catch (err) {
      result = { success: false, msg: String(err) }
      throw new HttpException(result, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteFolder(req, folderId: string) {
    let result
    try {
      const checkFolder = await this.folderRepository.findOne(folderId)

      if (checkFolder && checkFolder.userId == req.user.id) {
        await this.folderRepository.delete(folderId)
        result = { success: true, msg: 'Folder deleted succesfully' }
        return result
      } else {
        result = {
          success: false,
          msg: 'Folder does not exist or you are not authorized to delete it.'
        }
        return result
      }
    } catch (err) {
      result = { success: false, msg: String(err) }
      throw new HttpException(result, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateFolder(
    req,
    folderId: string,
    newFolder: FolderDto
  ): Promise<Folder> {
    let result
    try {
      const checkFolder = await this.folderRepository.findOne(folderId)
      console.log(checkFolder)
      if (checkFolder && checkFolder.userId == req.user.id) {
        const updated = Object.assign(checkFolder, newFolder)

        return await this.folderRepository.save(updated)
      } else {
        result = {
          success: false,
          msg: 'Folder does not exist or you are not authorized to delete it.'
        }
        return result
      }
    } catch (err) {
      result = { success: false, msg: String(err) }
      throw new HttpException(result, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getTasks(req, folderId: string) {
    let result, tasks
    try {
      const checkFolder = await this.folderRepository.findOne(folderId)
      if (!checkFolder || checkFolder.userId !== req.user.id) {
        result = {
          success: false,
          msg: 'Folder not exist or you are not authorized to get this tasks'
        }
        return result
      }
      tasks = await this.taskService.getTasksFromFolder(folderId)
      result = {
        success: true,
        folder: checkFolder.name,
        tasks: tasks
      }
      return result
    } catch (err) {
      result = { success: false, msg: String(err) }
      return new HttpException(result, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async createTask(req, folderId: string, newTask: any) {
    let result
    try {
      const folder = await this.folderRepository.findOne({
        where: {
          id: folderId,
          userId: req.user.id
        }
      })
      if (!folder) {
        result = {
          success: false,
          msg: 'Folder not found or you are not authorized to create a task on this folder.'
        }
        return result
      }
      const task = await this.taskService.createTaskFromFolder(
        folderId,
        newTask
      )
      result = { success: true, task: task }
      return result
    } catch (err) {
      result = { success: false, msg: String(err) }
      return new HttpException(result, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
