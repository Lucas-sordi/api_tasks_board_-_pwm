import { ReturnTaskTypeDTO } from "src/task-type/dtos/returnTaskType.dto";
import { TaskEntity } from "../entities/task.entity";


export class ReturnTaskById {
    id: number;
    name: string;
    description: string;
    taskType: ReturnTaskTypeDTO;
    parent?: parentDTO;
    children: ChildrenDTO[];
    createdAt: Date;
    updatedAt: Date;

    constructor(taskEntity: TaskEntity) {
        this.id = taskEntity.id;
        this.name = taskEntity.name;
        this.description = taskEntity.description;
        this.taskType = new ReturnTaskTypeDTO(taskEntity.taskType);
        this.children = taskEntity.children.map(child => new ChildrenDTO(child));

        if (taskEntity.parent) this.parent = new parentDTO(taskEntity);

        this.createdAt = taskEntity.createdAt;
        this.updatedAt = taskEntity.updatedAt;
    };
};

class ChildrenDTO {
    id: number;
    name: string;
    taskType: ReturnTaskTypeDTO;

    constructor(taskEntity: TaskEntity) {
        this.id = taskEntity.id;
        this.name = taskEntity.name;
        this.taskType = new ReturnTaskTypeDTO(taskEntity.taskType);
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