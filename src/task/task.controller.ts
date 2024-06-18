import { Body, Controller, Delete, Get, Param, Query, Post, Put, UseGuards } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/createTask.dto';
import { TaskService } from './task.service';
import { ReturnAllTasksDTO } from './dtos/returnAllTasks.dto';
import { TaskEntity } from './entities/task.entity';
import { ReturnRootTasksDTO } from './dtos/returnRootTasks.dto';
import { ReturnTaskById } from './dtos/returnTaskById.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from 'src/utils/decorators/getUser.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { OwnerGuard } from 'src/auth/guards/owner.guard';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {};
    
    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createTask: CreateTaskDTO, @GetUser() user: UserEntity) {
        return this.taskService.createTask(createTask, user.id);
    };
    
    @Get('/all')
    async getAll(): Promise<ReturnAllTasksDTO[]>{
        const getTasks: TaskEntity[] = await this.taskService.getAllTasks();

        return getTasks.map(task => new ReturnAllTasksDTO(task));
    };

    @Get('/roots')
    @UseGuards(JwtAuthGuard)
    async getRoots(@GetUser() user: UserEntity): Promise<ReturnRootTasksDTO[]>{
        const getRootTasks: TaskEntity[] = await this.taskService.getRootTasks(user.id);

        return getRootTasks.map(task => new ReturnRootTasksDTO(task));
    };

    @Get('/filter')
    @UseGuards(JwtAuthGuard)
    async filter(@Query('search') search: string, @GetUser() user: UserEntity): Promise<ReturnRootTasksDTO[]> {        
        const getTasksByKeyword: TaskEntity[] = await this.taskService.filterTasks(search, user.id);

        return getTasksByKeyword.map(task => new ReturnRootTasksDTO(task));
    };

    @Get('/:id')
    @UseGuards(JwtAuthGuard, OwnerGuard)
    async getById(@Param('id') id: number): Promise<ReturnRootTasksDTO>{
        const getTask: TaskEntity = await this.taskService.getTaskById(id);

        return new ReturnTaskById(getTask);
    };

    @Put('/:id')
    @UseGuards(JwtAuthGuard, OwnerGuard)
    async update(@Param('id') id: number, @Body() updateTask: CreateTaskDTO) {
        return this.taskService.updateTask(id, updateTask);
    };

    @Delete('/:id')
    @UseGuards(JwtAuthGuard, OwnerGuard)
    async delete(@Param('id') id: number) {
        return this.taskService.deleteTask(id);
    };
};