import { TaskEntity } from "src/task/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'taskType'})
export class TaskTypeEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'type', 'nullable': false })
    type: string;

    @OneToMany(() => TaskEntity, (task) => task.typeId)
    tasks?: TaskEntity[];
};