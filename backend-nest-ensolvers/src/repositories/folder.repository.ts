import { Folder } from 'src/entities/folder.entity'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Folder)
export class FolderRepository extends Repository<Folder> {}
