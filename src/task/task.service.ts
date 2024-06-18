import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/createTask.dto';
import { TaskEntity } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, ILike } from 'typeorm';
import { TaskTypeService } from 'src/task-type/task-type.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        private readonly taskTypeService: TaskTypeService,
        private readonly userService: UserService,
    ) {};

    async getAllTasks(): Promise<TaskEntity[]> {
        return await this.taskRepository.find({ 
            relations: ['taskType', 'parent', 'subtasks', 'user'], 
            order: { createdAt: 'ASC' } 
        });
    };

    async getRootTasks(userId: number): Promise<TaskEntity[]> {
        return await this.taskRepository.find({ 
            where: { parentId: IsNull(), userId: userId }, 
            relations: ['taskType', 'parent', 'subtasks', 'subtasks.taskType', 'user'], 
            order: { createdAt: 'ASC' } });
    };

    async getTaskById(taskId: number): Promise<TaskEntity> {
        const getTask = await this.taskRepository.findOne({ 
            where: { id: taskId }, 
            relations: ['taskType', 'parent', 'subtasks', 'subtasks.taskType', 'user'] 
        });

        if (!getTask) throw new NotFoundException(`Task not found`);

        return getTask;
    };

    async filterTasks(search: string, userId: number): Promise<TaskEntity[]> {
        let whereClause: any = [ ];
    
        if (search) {
            whereClause.push({ name: ILike(`%${search}%`), parentId: IsNull(), userId: userId });

            if (!isNaN(Number(search))) {
                whereClause.push({ id: parseInt(search), parentId: IsNull(), userId: userId });
            };
        } else {
          whereClause.push({ parentId: IsNull(), userId: userId });
        };

        return await this.taskRepository.find({
            where: whereClause,
            relations: ['taskType', 'parent', 'subtasks', 'subtasks.taskType', 'user'], 
            order: { createdAt: 'ASC' } 
        });
    };
    
    async createTask(createTaskBody: CreateTaskDTO, userId: number): Promise<TaskEntity> {
        await this.checkUserExists(userId);
        await this.checkTaskTypeExists(createTaskBody.typeId);
        if (createTaskBody.parentId) await this.checkParentIsValid(createTaskBody.parentId);

        return await this.taskRepository.save({ ...createTaskBody, userId: userId });
    };

    async updateTask(taskId: number, updateTaskBody: CreateTaskDTO): Promise<{ message: string }> {
        await this.checkTaskTypeExists(updateTaskBody.typeId); 
        if (updateTaskBody.parentId) {
            await this.checkIfTaskExistsAndHasSubtasks(taskId, `Task can't have a parent because it has subtasks`);
            await this.checkParentIsValid(updateTaskBody.parentId, taskId);
        } else {
            await this.checkTaskExists(taskId);
        };

        await this.taskRepository.update(taskId, { ...updateTaskBody });

        return { message: `Task updated successfully`};
    };

    async deleteTask(taskId: number) {
        await this.checkIfTaskExistsAndHasSubtasks(taskId, `Task can't be deleted because it has subtasks`);

        await this.taskRepository.delete(taskId);

        return { message: `Task deleted successfully`};
    };

    
    // Funções de validação
    async checkParentIsValid(parentId: number, taskId?: number) {
        if (parentId == taskId) throw new BadRequestException(`Task can't be its own parent`); // valida se o ParentId é diferente do TaskId

        const parent = await this.taskRepository.findOne({
            where: { id: parentId }
        });

        if (!parent) throw new NotFoundException(`ParentId not found`); // valida se o ParentId existe
        if (parent.parentId) throw new BadRequestException(`The ParentId informed isn't a root task`); // valida se o ParentId informado possui parent

        return;
    };

    async checkIfTaskExistsAndHasSubtasks(taskId: number, customMessage?: string) {
        const task = await this.taskRepository.findOne({
            where: { id: taskId },
            relations: ['subtasks']
        });

        if (!task) throw new NotFoundException(`Task not found`); // valida se a Task existe
        if (task.subtasks.length) throw new BadRequestException(customMessage || `Task has subtasks`); // valida se a Task tem filhos

        return;
    };

    async checkTaskExists(taskId: number) {
        const task = await this.taskRepository.findOne({
            where: { id: taskId },
            relations: ['subtasks']
        });

        if (!task) throw new NotFoundException(`Task not found`); // valida se a Task existe

        return;
    };

    async checkTaskTypeExists(typeId: number) {
        const taskType = await this.taskTypeService.getTaskTypeById(typeId);

        if (!taskType) throw new NotFoundException(`TaskType not found`); // valida se o TypeId existe

        return;
    };

    async checkUserExists(userId: number) {
        const findUser = await this.userService.findById(userId);

        if (!findUser) throw new NotFoundException(`User not found`);

        return;
    };
};