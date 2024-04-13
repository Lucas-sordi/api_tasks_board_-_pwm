import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
        await this.taskTypeService.getTaskTypeById(createTaskDTO.typeId); // valida se o TypeId existe
        if (createTaskDTO.parentId) await this.checkParentIsValid(createTaskDTO.parentId); // valida se o ParentId existe e se ele tem parent

        const saveTask = await this.taskRepository.save({ ...createTaskDTO });

        return ({ "id": saveTask.id });
    };

    async getAllTasks(): Promise<TaskEntity[]> {
        return await this.taskRepository.find({ relations: ['taskType', 'parent', 'children'], order: { createdAt: 'ASC' } });
    };

    async getRootTasks(): Promise<TaskEntity[]> {
        return await this.taskRepository.find({ relations: ['taskType', 'parent', 'children', 'children.taskType'], where: { parentId: null}, order: { createdAt: 'ASC' } });
    };

    async checkParentIsValid(parentId: number): Promise<TaskEntity> {
        const parent = await this.taskRepository.findOne({
            where: { id: parentId }
        });

        if (!parent) throw new NotFoundException(`ParentId not found`);

        if (parent.parentId) throw new BadRequestException(`The ParentId informed isn't a root task`);

        return parent;
    }
};