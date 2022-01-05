import { JwtAuthGuard } from './../../guards/jwt-auth.guard'
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
  Query,
  Req,
  Request,
  UseGuards
} from '@nestjs/common'
import { Folder } from 'src/entities/folder.entity'

@UseGuards(JwtAuthGuard)
@Controller('folder')
export class FolderController {
  constructor(private folderService: FolderService) {}

  @Get()
  findByUser(@Request() req): Promise<Folder[]> {
    return this.folderService.findByUser(req)
  }

  @Get(':folderId')
  findFolder(@Param('folderId') folderId: string): Promise<Folder> {
    return this.folderService.findFolder(folderId)
  }

  @Post()
  createFolder(@Request() req, @Body() newFolder: FolderDto) {
    return this.folderService.createFolder(req, newFolder)
  }

  @Delete(':folderId')
  deleteFolder(@Request() req, @Param('folderId') folderId: string) {
    return this.folderService.deleteFolder(req, folderId)
  }

  @Put(':folderId')
  updateFolder(
    @Param('folderId') folderId: string,
    @Body() newFolder: FolderDto
  ): Promise<Folder> {
    return this.folderService.updateFolder(folderId, newFolder)
  }
}
