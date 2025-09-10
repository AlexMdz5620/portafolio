import {
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Tech {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 60, default: 'Intermedio' })
  mastery_level: string;

  @Column({ type: 'varchar', length: 100 })
  category: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // Relación con User
  @ManyToOne(() => User, (user) => user.techs, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  user: User;

  // Relación muchos a muchos con Project
  @ManyToMany(() => Project, (project) => project.techs)
  projects: Project[];
}
