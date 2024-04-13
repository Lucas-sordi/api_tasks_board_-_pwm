import { ReturnTaskTypeDTO } from "src/task-type/dtos/returnTaskType.dto";
import { TaskEntity } from "../entities/task.entity";


export class ReturnAllTasksDTO {
    id: number;
    name: string;
    description: string;
    taskType: ReturnTaskTypeDTO;
    createdAt: Date;
    updatedAt: Date;
    parent?: parentDTO;
    children: ChilrenDTO[];

    constructor(taskEntity: TaskEntity) {
        this.id = taskEntity.id;
        this.name = taskEntity.name;
        this.description = taskEntity.description;
        this.createdAt = taskEntity.createdAt;
        this.updatedAt = taskEntity.updatedAt;
        this.taskType = new ReturnTaskTypeDTO(taskEntity.taskType);
        this.children = taskEntity.children.map(child => new ChilrenDTO(child));

        if (taskEntity.parent) this.parent = new parentDTO(taskEntity);
    };
};

class ChilrenDTO {
    id: number;
    name: string;

    constructor(taskEntity: TaskEntity) {
        this.id = taskEntity.id;
        this.name = taskEntity.name;
    };
};

class parentDTO {
    id: number;
    name: string;

    constructor(taskEntity: TaskEntity) {
        this.id = taskEntity.parent.id;
        this.name = taskEntity.parent.name;
    };
};