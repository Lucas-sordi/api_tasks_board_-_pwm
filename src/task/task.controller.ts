import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/createTask.dto';
import { TaskService } from './task.service';
import { ReturnAllTasksDTO } from './dtos/returnAllTasks.dto';
import { TaskEntity } from './entities/task.entity';
import { ReturnRootTasksDTO } from './dtos/returnRootTasks.dto';
import { ReturnTaskById } from './dtos/returnTaskById.dto';

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

    @Get('/:id')
    async getById(@Param('id') id: number): Promise<ReturnRootTasksDTO>{
        const getTask: TaskEntity = await this.taskService.getTaskById(id);

        return new ReturnTaskById(getTask);
    };

    @Put('/:id')
    async update(@Param('id') id: number, @Body() updateTask: CreateTaskDTO) {
        return this.taskService.updateTask(id, updateTask);
    };

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return this.taskService.deleteTask(id);
    };
};