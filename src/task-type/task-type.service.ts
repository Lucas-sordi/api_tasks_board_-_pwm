import { Injectable } from '@nestjs/common';
import { TaskTypeEntity } from './entities/task-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskTypeService {
    constructor(
        @InjectRepository(TaskTypeEntity)
        private readonly taskTypeRepository: Repository<TaskTypeEntity>
    ) {};

    async getAllTaskTypes(): Promise<TaskTypeEntity[]> {
        return this.taskTypeRepository.find();
    };
};