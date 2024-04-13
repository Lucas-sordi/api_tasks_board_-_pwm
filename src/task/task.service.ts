import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/createTask.dto';
import { TaskEntity } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>
    ) {};
    
    async createTask(createTaskDTO: CreateTaskDTO): Promise<{ id: number }> {
        const saveTask = await this.taskRepository.save({ ...createTaskDTO });

        return ({ "id": saveTask.id });
    };

    async getAllTasks(): Promise<TaskEntity[]> {
        return this.taskRepository.find();
    };
};
