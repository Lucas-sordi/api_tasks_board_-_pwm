import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/createTask.dto';
import { TaskEntity } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskTypeService } from 'src/task-type/task-type.service';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        private readonly taskTypeService: TaskTypeService,
    ) {};
    
    async createTask(createTaskDTO: CreateTaskDTO): Promise<{ id: number }> {
        await this.taskTypeService.getTaskTypeById(createTaskDTO.typeId);

        const saveTask = await this.taskRepository.save({ ...createTaskDTO });

        return ({ "id": saveTask.id });
    };

    async getAllTasks(): Promise<TaskEntity[]> {
        return this.taskRepository.find();
    };
};
