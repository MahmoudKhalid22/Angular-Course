import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { UserComponent } from './components/user/user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserComponent],
})
export class AppComponent {}
