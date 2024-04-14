import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/createTask.dto';
import { TaskEntity } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { TaskTypeService } from 'src/task-type/task-type.service';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        private readonly taskTypeService: TaskTypeService,
    ) {};

    async getAllTasks(): Promise<TaskEntity[]> {
        return await this.taskRepository.find({ 
            relations: ['taskType', 'parent', 'subtasks'], 
            order: { createdAt: 'ASC' } 
        });
    };

    async getRootTasks(): Promise<TaskEntity[]> {
        return await this.taskRepository.find({ 
            where: { parentId: IsNull() }, 
            relations: ['taskType', 'parent', 'subtasks', 'subtasks.taskType'], 
            order: { createdAt: 'ASC' } });
    };

    async getTaskById(taskId: number): Promise<TaskEntity> {
        const getTask = await this.taskRepository.findOne({ 
            where: { id: taskId }, 
            relations: ['taskType', 'parent', 'subtasks', 'subtasks.taskType'] 
        });

        if (!getTask) throw new NotFoundException(`Task not found`);

        return getTask;
    };

    async createTask(createTaskBody: CreateTaskDTO): Promise<TaskEntity> {
        await this.checkTaskTypeExists(createTaskBody.typeId);
        await this.checkParentIsValid(createTaskBody.parentId);

        return await this.taskRepository.save({ ...createTaskBody });
    };

    async updateTask(taskId: number, updateTaskBody: CreateTaskDTO): Promise<{ message: string }> {
        await this.checkTaskTypeExists(updateTaskBody.typeId); 
        await this.checkIfTaskExistsAndHasSubtasks(taskId, `Task can't have a parent because it has subtasks`);
        await this.checkParentIsValid(updateTaskBody.parentId, taskId);

        await this.taskRepository.update(taskId, { ...updateTaskBody });

        return { message: `Task updated successfully`};
    };

    async deleteTask(taskId: number) {
        await this.checkIfTaskExistsAndHasSubtasks(taskId, `Task can't be deleted because it has subtasks`);

        await this.taskRepository.delete(taskId);

        return { message: `Task deleted successfully`};
    };





    async checkParentIsValid(parentId: number, taskId?: number): Promise<TaskEntity> {
        if (parentId == null) return; // se o parentId for null, não precisa validar
        if (parentId == taskId) throw new BadRequestException(`Task can't be its own parent`); // valida se o ParentId é diferente do TaskId

        const parent = await this.taskRepository.findOne({
            where: { id: parentId }
        });

        if (!parent) throw new NotFoundException(`ParentId not found`); // valida se o ParentId existe
        if (parent.parentId) throw new BadRequestException(`The ParentId informed isn't a root task`); // valida se o ParentId informado possui parent

        return;
    };

    async checkIfTaskExistsAndHasSubtasks(taskId: number, customMessage?: string): Promise<TaskEntity> {
        const task = await this.taskRepository.findOne({
            where: { id: taskId },
            relations: ['subtasks']
        });

        if (!task) throw new NotFoundException(`Task not found`); // valida se a Task existe
        if (task.subtasks.length) throw new BadRequestException(customMessage || `Task has subtasks`); // valida se a Task tem filhos

        return;
    };

    async checkTaskTypeExists(typeId: number): Promise<TaskEntity> {
        const taskType = await this.taskTypeService.getTaskTypeById(typeId);

        if (!taskType) throw new NotFoundException(`TaskType not found`); // valida se o TypeId existe

        return;
    };
};