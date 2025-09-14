import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  link: string;

  @Column({ type: 'boolean', default: false })
  active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // Relación con User
  @ManyToOne(() => User, (user) => user.links, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  user: User;
}
