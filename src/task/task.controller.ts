import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/createTask.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {};
    
    @Post()
    async createTask(@Body() createTask: CreateTaskDTO) {
        return this.taskService.createTask(createTask);
    };
    
    @Get()
    async getAllTasks() {
        return this.taskService.getAllTasks();
    };
};