import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTaskType } from './add-task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask {
  @Output() close = new EventEmitter<void>();
  @Input({ required: true }) userId!: string;
  private addTaskService = inject(TasksService);
  enteredTitle: string = '';
  enteredSummary: string = '';
  enteredDueDate: string = '';

  onAddTask(taskData: NewTaskType) {
    // this.addTask.emit(taskData);
    this.addTaskService.createTask(
      {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        dueDate: this.enteredDueDate,
      },
      this.userId
    );
    this.onCancel();
  }
  onCancel() {
    this.close.emit();
  }
}
