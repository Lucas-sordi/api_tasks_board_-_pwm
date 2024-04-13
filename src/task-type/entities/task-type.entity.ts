import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'taskType'})
export class TaskTypeEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'type', 'nullable': false })
    type: string;
};