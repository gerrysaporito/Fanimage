// File: db/entity/User
// Description: User TypeORM definition.

import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import Module from "./Module";

/*
 * The User entity defines the SQL architecture for an user that is on the platform.
 * The User entity will be a general entity for every user, and will have a profile
 * associated with it that will contain more information about the user.
 */
@Entity({ name: "users" })
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 150, unique: true, default: "" })
  email!: string;

  @Column({ type: "varchar", default: "" })
  password?: string;

  @OneToMany(type => Module, (module: Module) => module.createdByUser)
  modules!: Module[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}

export default User;
