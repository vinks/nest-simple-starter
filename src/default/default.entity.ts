import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Default {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
