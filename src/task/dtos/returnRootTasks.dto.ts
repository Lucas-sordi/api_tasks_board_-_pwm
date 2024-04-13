import { ReturnTaskTypeDTO } from "src/task-type/dtos/returnTaskType.dto";
import { TaskEntity } from "../entities/task.entity";


export class ReturnRootTasksDTO {
    id: number;
    name: string;
    taskType: ReturnTaskTypeDTO;
    children: ChildrenDTO[];

    constructor(taskEntity: TaskEntity) {
        this.id = taskEntity.id;
        this.name = taskEntity.name;
        this.taskType = new ReturnTaskTypeDTO(taskEntity.taskType);
        this.children = taskEntity.children.map(child => new ChildrenDTO(child));
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