import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'task'})
export class TaskEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'name', 'nullable': false })
    name: string;

    @Column({ name: 'description', 'nullable': false })
    description: string;

    @Column({ name: 'parentId', 'nullable': true })
    parentId: number;

    @Column({ name: 'typeId', 'nullable': false })
    typeId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
};