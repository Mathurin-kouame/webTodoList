import { Task } from 'src/tasks/task.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Projet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  titre: string;

  @Column('text')
  description: string;

  @ManyToOne(() => User, (user) => user.projets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Task, (task) => task.projet, { cascade: true })
  tasks: Task[];
}
