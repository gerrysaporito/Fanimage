// File: db/entity/Module
// Description: Module TypeORM definition. Modules hold information related to uploaded items.

import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn, VersionColumn, OneToMany } from "typeorm";
import User from "./User";

/*
 * The Module entity defines the SQL architecture for a module related to a position.
 */
@Entity({ name: "modules" })
class Module extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", default: "" })
    title!: string;

    @Column({ type: "varchar", default: "" })
    fileType!: string;

    @Column({ type: "varchar", default: "" })
    s3key!: string;

    @Column({ type: "simple-array", default: [] })
    tags!: string[];

    @ManyToOne(type => User, (user: User) => user.modules)
    createdByUser!: User | undefined;

    @Column({ nullable: true })
    createdByUserId!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}

export default Module;
