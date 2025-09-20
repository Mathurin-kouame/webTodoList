import { Projet } from 'src/projets/projet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  titre: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: ['A faire', 'En cours', 'Terminée'],
    default: 'A faire',
  })
  statut: 'A faire' | 'En cours' | 'Terminée';

  @Column({ type: 'date', nullable: true })
  date_echeance: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Projet, (projet) => projet.tasks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  projet: Projet;
}
