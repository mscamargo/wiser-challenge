import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shortId: string;

  @Column()
  url: string;

  @Column('timestamp')
  expiresAt: Date;

  @Column({ default: 0 })
  visitCount?: number;
}
