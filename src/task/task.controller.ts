import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/createTask.dto';
import { TaskService } from './task.service';
import { ReturnAllTasksDTO } from './dtos/returnAllTasks.dto';
import { TaskEntity } from './entities/task.entity';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {};
    
    @Post()
    async createTask(@Body() createTask: CreateTaskDTO) {
        return this.taskService.createTask(createTask);
    };
    
    @Get('/all')
    async getAllTasks(): Promise<ReturnAllTasksDTO[]>{
        const getTasks: TaskEntity[] = await this.taskService.getAllTasks();

        return getTasks.map(task => new ReturnAllTasksDTO(task));
    };
};