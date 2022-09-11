import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Test {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  firstName!: string;
  @Column({ nullable: true })
  lastName!: string;
}

export default Test;
