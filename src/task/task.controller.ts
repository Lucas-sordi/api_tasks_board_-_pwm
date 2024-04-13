import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/createTask.dto';
import { TaskService } from './task.service';
import { ReturnAllTasksDTO } from './dtos/returnAllTasks.dto';
import { TaskEntity } from './entities/task.entity';
import { ReturnRootTasksDTO } from './dtos/returnRootTasks.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {};
    
    @Post()
    async create(@Body() createTask: CreateTaskDTO) {
        return this.taskService.createTask(createTask);
    };
    
    @Get('/all')
    async getAll(): Promise<ReturnAllTasksDTO[]>{
        const getTasks: TaskEntity[] = await this.taskService.getAllTasks();

        return getTasks.map(task => new ReturnAllTasksDTO(task));
    };

    @Get('/roots')
    async getRoots(): Promise<ReturnRootTasksDTO[]>{
        const getRootTasks: TaskEntity[] = await this.taskService.getRootTasks();

        return getRootTasks.map(task => new ReturnRootTasksDTO(task));
    };
};