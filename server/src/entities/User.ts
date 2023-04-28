import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ type: "text" })
  name!: string;

  @Field(() => String)
  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ type: "text" })
  password!: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
