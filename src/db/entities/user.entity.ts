import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint", unique: true})
  userId: number;

  @Column()
  ticker: string;

  @Column()
  tokenContractAddress: string;

  @Column({ type: "bigint"})
  currentBlock: number;
}