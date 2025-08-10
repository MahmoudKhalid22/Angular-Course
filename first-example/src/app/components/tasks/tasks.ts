import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from './task/task';
import { AddTask } from './add-task/add-task';
import { TaskType } from './task/task.model';
import { NewTaskType } from './add-task/add-task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  imports: [Task, AddTask],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks {
  @Input({ required: true }) user!: any;

  activeAddTask = false;
  private tasksService: TasksService;
  constructor(tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  onAddTask() {
    this.activeAddTask = true;
  }
  onCancelAddTask() {
    this.activeAddTask = false;
  }
  onCreateTask(taskData: NewTaskType) {
    this.tasksService.createTask(taskData, this.user.id);
    this.activeAddTask = false;
  }

  getUserTasks() {
    return this.tasksService.getUserTasks(this.user.id);
  }
  onRemoveTask(taskId: string) {
    this.tasksService.removeTask(taskId);
  }
}
