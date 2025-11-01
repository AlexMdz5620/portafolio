import {
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tech } from '../../tech/entities/tech.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  img_url: string;

  @Column({ type: 'varchar', length: 500 })
  github_url: string;

  @Column({ type: 'varchar', length: 500 })
  demo_url: string;

  @Column({ type: 'varchar', length: 60, default: 'frontend' })
  type: string;

  @Column({ type: 'boolean', default: false })
  featured: boolean;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // Relación con User
  @ManyToOne(() => User, (user) => user.projects, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  user: User;

  // Relación muchos a muchos con Tech
  @ManyToMany(() => Tech, (tech) => tech.projects, { cascade: true })
  @JoinTable({
    name: 'project_techs',
    joinColumn: { name: 'project_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tech_id', referencedColumnName: 'id' },
  })
  techs: Tech[];
}
