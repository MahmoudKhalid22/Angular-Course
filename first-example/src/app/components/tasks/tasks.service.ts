import { Injectable } from '@angular/core';
import { NewTaskType } from './add-task/add-task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private dummyTasks = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ];

  constructor() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.dummyTasks = JSON.parse(storedTasks);
    }
  }

  getUserTasks(userId: string) {
    return this.dummyTasks.filter((task) => task.userId === userId);
  }

  removeTask(taskId: string) {
    console.log('Task selected:', taskId);
    this.dummyTasks = this.dummyTasks.filter((task) => task.id !== taskId);
    this.saveTasks();
  }

  createTask(taskData: NewTaskType, userId: string) {
    this.dummyTasks.unshift({
      ...taskData,
      id: Math.random().toString(),
      userId,
    });
    // this.activeAddTask = false;
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.dummyTasks));
  }
}
