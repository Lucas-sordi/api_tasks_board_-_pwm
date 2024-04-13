import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskEntity } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskTypeModule } from 'src/task-type/task-type.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), TaskTypeModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {};
