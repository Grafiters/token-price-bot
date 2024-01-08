import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  userId: string;

  @Column()
  tokenContractAddress: string;
}