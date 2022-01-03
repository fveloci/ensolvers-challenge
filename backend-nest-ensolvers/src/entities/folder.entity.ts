import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Task } from './task.entity'

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  userId: number

  /* @OneToMany((type) => Task, (Task) => Task.id, { cascade: true, eager: true })
  folders: Task[] */
}
