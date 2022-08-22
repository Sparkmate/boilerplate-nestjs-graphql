import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the user' })
  userId: string;
  @Column({ nullable: true })
  @Field(() => String, {
    description: 'first name of the user',
    nullable: true,
  })
  firstName: string;
  @Column({ nullable: true })
  @Field(() => String, { description: 'last name of the user', nullable: true })
  lastName: string;
  @Column()
  @Field(() => String, { description: 'email of the user' })
  email: string;
  @Column()
  @Field(() => String, { description: 'password of the user' })
  password: string;
}
