import { DescriptionType } from '../../enums/description-type.enum';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Description {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: DescriptionType,
    default: DescriptionType.ABOUT,
  })
  type: DescriptionType;

  @Column({ type: 'varchar', length: 60, nullable: true })
  name?: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, (user) => user.links, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  user: User;
}
