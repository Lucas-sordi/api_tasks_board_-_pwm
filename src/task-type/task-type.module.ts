import { Module } from '@nestjs/common';
import { TaskTypeController } from './task-type.controller';
import { TaskTypeService } from './task-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskTypeEntity } from './entities/task-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskTypeEntity])],
  controllers: [TaskTypeController],
  providers: [TaskTypeService],
})
export class TaskTypeModule {};
