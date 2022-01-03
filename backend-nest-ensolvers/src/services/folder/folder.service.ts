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

  async findAll(params): Promise<Folder[]> {
    return await this.folderRepository.find()
  }

  async findFolder(folderId: string): Promise<Folder> {
    return await this.folderRepository.findOne({ where: { id: folderId } })
  }

  createFolder(newFolder: FolderDto): Promise<Folder> {
    return this.folderRepository.save(newFolder)
  }

  async deleteFolder(folderId: string) {
    return await this.folderRepository.delete({ id: parseInt(folderId) })
  }

  async updateFolder(folderId: string, newFolder: FolderDto): Promise<Folder> {
    const toUpdate = await this.folderRepository.findOne(folderId)

    const updated = Object.assign(toUpdate, newFolder)

    return await this.folderRepository.save(updated)
  }
}
