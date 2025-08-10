import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { User } from './components/user/user';
import { DUMMY_USERS } from './utils/data';
import { Tasks } from './components/tasks/tasks';

@Component({
  selector: 'app-root',
  imports: [Header, User, Tasks],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  users = DUMMY_USERS;
  selectedUser?: { name: string; avatar: string; id: string };
  onSelectUser(id: string) {
    this.selectedUser = this.users.find((user) => user.id === id)!;
  }
}
