import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint", unique: true})
  userId: number;

  @Column()
  ticker: string;

  @Column({ type: 'varchar', length: '15' })
  chain: string;

  @Column({ type: "int8"})
  chainId: number;

  @Column()
  tokenContractAddress: string;

  @Column({ type: "bigint"})
  currentBlock: number;
}