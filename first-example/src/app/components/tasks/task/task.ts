import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskType } from './task.model';
import { DatePipe } from '@angular/common';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  imports: [DatePipe],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class Task {
  @Input({ required: true }) task!: TaskType;
  constructor(private tasksService: TasksService) {
    this.tasksService = tasksService;
  }
  onSelectTask() {
    this.tasksService.removeTask(this.task.id);
  }
}
