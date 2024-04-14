import { ReturnTaskTypeDTO } from "src/task-type/dtos/returnTaskType.dto";
import { TaskEntity } from "../entities/task.entity";


export class ReturnRootTasksDTO {
    id: number;
    name: string;
    taskType: ReturnTaskTypeDTO;
    subtasks: SubtaskDTO[];

    constructor(taskEntity: TaskEntity) {
        this.id = taskEntity.id;
        this.name = taskEntity.name;
        this.taskType = new ReturnTaskTypeDTO(taskEntity.taskType);
        this.subtasks = taskEntity.subtasks.map(subtask => new SubtaskDTO(subtask));
    };
};

class SubtaskDTO {
    id: number;
    name: string;
    taskType: ReturnTaskTypeDTO;

    constructor(taskEntity: TaskEntity) {
        this.id = taskEntity.id;
        this.name = taskEntity.name;
        this.taskType = new ReturnTaskTypeDTO(taskEntity.taskType);
    };
};