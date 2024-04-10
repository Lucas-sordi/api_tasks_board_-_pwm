import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/createTask.dto';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TaskService {
    private tasks: Task[] = [];

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        const newTask = {
            ...createTaskDTO,
            id: this.tasks.length + 1,
        };
        
        this.tasks.push(newTask);

        return ({
            ...createTaskDTO,
            id: 1,
        });
    };

    async getAllTasks(): Promise<Task[]> {
        return this.tasks;
    }
};
