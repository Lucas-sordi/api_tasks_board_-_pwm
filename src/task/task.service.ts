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
            relations: ['taskType', 'parent', 'children'], 
            order: { createdAt: 'ASC' } 
        });
    };

    async getRootTasks(): Promise<TaskEntity[]> {
        return await this.taskRepository.find({ 
            where: { parentId: IsNull() }, 
            relations: ['taskType', 'parent', 'children', 'children.taskType'], 
            order: { createdAt: 'ASC' } });
    };

    async getTaskById(taskId: number): Promise<TaskEntity> {
        const getTask = await this.taskRepository.findOne({ 
            where: { id: taskId }, 
            relations: ['taskType', 'parent', 'children', 'children.taskType'] 
        });

        if (!getTask) throw new NotFoundException(`Task not found`);

        return getTask;
    };

    async createTask(createTaskBody: CreateTaskDTO): Promise<TaskEntity> {
        await this.taskTypeService.getTaskTypeById(createTaskBody.typeId); // valida se o TypeId existe
        if (createTaskBody.parentId) await this.checkParentIsValid(createTaskBody.parentId); // valida se o ParentId existe e se ele tem parent

        return await this.taskRepository.save({ ...createTaskBody });
    };

    async updateTask(taskId: number, updateTaskBody: CreateTaskDTO): Promise<{ message: string }> {
        await this.taskTypeService.getTaskTypeById(updateTaskBody.typeId); // valida se o TypeId existe
        if (updateTaskBody.parentId) {
            if (updateTaskBody.parentId == taskId) throw new BadRequestException(`Task can't be its own parent`); // valida se o ParentId é diferente do TaskId
            await this.checkParentIsValid(updateTaskBody.parentId); // valida se o ParentId existe e se ele tem parent
            await this.checkIfTaskExistsAndHasChildren(taskId); // valida se a Task existe e tem filhos
        };

        await this.taskRepository.update(taskId, { ...updateTaskBody });

        return { message: `Task updated successfully`};
    };

    async deleteTask(taskId: number) {
        await this.checkIfTaskExistsAndHasChildren(taskId, `Task can't be deleted because it has children`); // valida se a Task existe e tem filhos

        await this.taskRepository.delete(taskId);

        return { message: `Task deleted successfully`};
    };

    async checkParentIsValid(parentId: number): Promise<TaskEntity> {
        const parent = await this.taskRepository.findOne({
            where: { id: parentId }
        });

        if (!parent) throw new NotFoundException(`ParentId not found`);

        if (parent.parentId) throw new BadRequestException(`The ParentId informed isn't a root task`);

        return;
    };

    async checkIfTaskExistsAndHasChildren(taskId: number, customMessage?: string): Promise<TaskEntity> {
        const task = await this.taskRepository.findOne({
            where: { id: taskId },
            relations: ['children']
        });

        if (!task) throw new NotFoundException(`Task not found`);
        if (task.children.length) throw new BadRequestException(customMessage || `Task can't have a parent because it has children`);

        return;
    };
};