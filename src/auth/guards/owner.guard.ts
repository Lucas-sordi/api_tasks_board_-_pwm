import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private readonly taskService: TaskService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const taskId = request.params.id;

    if (!user || !taskId) {
      throw new UnauthorizedException();
    }

    const task = await this.taskService.getTaskById(taskId);

    if (!task || task.userId !== user.id) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
