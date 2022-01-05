import { FolderDto } from './../../dtos/folder.dto'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Folder } from 'src/entities/folder.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder) private folderRepository: Repository<Folder>
  ) {}

  async findByUser(req): Promise<Folder[]> {
    let result, folders
    try {
      return await this.folderRepository.find({
        where: { user: req.user.id }
      })
    } catch (err) {
      throw err
    }
  }

  async findFolder(folderId: string): Promise<Folder> {
    return await this.folderRepository.findOne({ where: { id: folderId } })
  }

  async createFolder(req, newFolder: FolderDto): Promise<any> {
    try {
      const folder = await this.folderRepository.save({
        name: newFolder.name,
        user: req.user.id
      })
      return folder
    } catch (err) {
      throw err
    }
  }

  async deleteFolder(req, folderId: string) {
    let result
    try {
      const checkFolder = await this.folderRepository.findOne(folderId)
      if (checkFolder && checkFolder.user == req.user.id) {
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
      throw err
    }
    return await this.folderRepository.delete({ id: parseInt(folderId) })
  }

  async updateFolder(folderId: string, newFolder: FolderDto): Promise<Folder> {
    const toUpdate = await this.folderRepository.findOne(folderId)

    const updated = Object.assign(toUpdate, newFolder)

    return await this.folderRepository.save(updated)
  }
}
