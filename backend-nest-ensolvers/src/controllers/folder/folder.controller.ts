import { FolderDto } from './../../dtos/folder.dto'
import { FolderService } from './../../services/folder/folder.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common'
import { Folder } from 'src/interfaces/folder.class'

@Controller('folder')
export class FolderController {
  constructor(private folderService: FolderService) {}

  @Get()
  findAll(@Query() query: Request): Promise<Folder[]> {
    return this.folderService.findAll(query)
  }

  @Get(':folderId')
  findFolder(@Param('folderId') folderId: string): Promise<Folder> {
    return this.folderService.findFolder(folderId)
  }

  @Post()
  createFolder(@Body() newFolder: FolderDto): Promise<Folder> {
    return this.folderService.createFolder(newFolder)
  }

  @Delete(':folderId')
  deleteFolder(@Param('folderId') folderId: string) {
    return this.folderService.deleteFolder(folderId)
  }

  @Put(':folderId')
  updateFolder(
    @Param('folderId') folderId: string,
    @Body() newFolder: FolderDto
  ): Promise<Folder> {
    return this.folderService.updateFolder(folderId, newFolder)
  }
}
