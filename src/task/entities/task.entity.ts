import { TaskTypeEntity } from "src/task-type/entities/task-type.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({ name: 'userId', 'nullable': false })
    userId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => TaskTypeEntity, (taskType) => taskType.id)
    @JoinColumn({ name: 'typeId', referencedColumnName: 'id'})
    taskType: TaskTypeEntity;

    @ManyToOne(() => TaskEntity, (task) => task.parentId)
    parent: TaskEntity;

    @OneToMany(() => TaskEntity, (task) => task.parent)
    subtasks: TaskEntity[];

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: UserEntity;
};