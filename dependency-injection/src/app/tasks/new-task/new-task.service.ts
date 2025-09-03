import { Injectable, signal } from '@angular/core';
import { Task } from '../task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);

  public allTasks = this.tasks.asReadonly();

  addTask(title: string, description: string) {
    const newTask: Task = {
      id: Math.random().toString(),
      title,
      description,
      status: 'OPEN',
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }
}
