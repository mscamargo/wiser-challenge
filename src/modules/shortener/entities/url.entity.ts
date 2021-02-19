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
}
