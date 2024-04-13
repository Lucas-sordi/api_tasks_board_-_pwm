import { Controller, Get } from '@nestjs/common';
import { TaskTypeService } from './task-type.service';
import { ReturnTaskTypeDTO } from './dtos/returnTaskType.dto';

@Controller('task-type')
export class TaskTypeController {
    constructor(private readonly taskTypeService: TaskTypeService) {};

    @Get()
    async getAllTasks(): Promise<ReturnTaskTypeDTO[]> {
        return this.taskTypeService.getAllTaskTypes();
    };
};
