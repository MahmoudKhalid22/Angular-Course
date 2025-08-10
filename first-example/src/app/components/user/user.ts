import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserType } from './user.model';
import { Shared } from '../shared/shared';

@Component({
  selector: 'app-user',
  imports: [Shared],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {
  @Input({ required: true }) user!: UserType;
  @Input({ required: true }) selected!: boolean;

  @Output() select = new EventEmitter<string>();

  onSelectUser() {
    this.select.emit(this.user.id);
  }
}
