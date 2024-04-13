import { ReturnTaskTypeDTO } from "src/task-type/dtos/returnTaskType.dto";
import { TaskEntity } from "../entities/task.entity";


export class ReturnRootTasksDTO {
    id: number;
    name: string;
    description: string;
    taskType: ReturnTaskTypeDTO;
    children: ChilrenDTO[];

    constructor(taskEntity: TaskEntity) {
        this.id = taskEntity.id;
        this.name = taskEntity.name;
        this.taskType = new ReturnTaskTypeDTO(taskEntity.taskType);
        this.children = taskEntity.children.map(child => new ChilrenDTO(child));
    };

};

class ChilrenDTO {
    id: number;
    name: string;
    taskType: ReturnTaskTypeDTO;

    constructor(taskEntity: TaskEntity) {
        this.id = taskEntity.id;
        this.name = taskEntity.name;
        this.taskType = new ReturnTaskTypeDTO(taskEntity.taskType);
    };
};