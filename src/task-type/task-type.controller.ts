import { Controller, Get } from '@nestjs/common';
import { TaskTypeService } from './task-type.service';

@Controller('task-type')
export class TaskTypeController {
    constructor(private readonly taskTypeService: TaskTypeService) {};

    @Get()
    async getAllTasks() {
        return this.taskTypeService.getAllTaskTypes();
    };
};
