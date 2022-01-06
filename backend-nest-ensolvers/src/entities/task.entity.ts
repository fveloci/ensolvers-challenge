import { Folder } from 'src/entities/folder.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ default: false })
  done: boolean

  @Column('int', { nullable: true })
  folderId: number

  @ManyToOne(() => Folder, (folder) => folder.tasks)
  @JoinColumn({ name: 'folderId' })
  folder: Folder

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
