import { TaskTypeEntity } from "../entities/task-type.entity";

export class ReturnTaskTypeDTO {
    
    id: number;
    type: string;
    
    constructor(taskTypeEntity: TaskTypeEntity) {
        this.id = taskTypeEntity.id;
        this.type = taskTypeEntity.type;
    };

};