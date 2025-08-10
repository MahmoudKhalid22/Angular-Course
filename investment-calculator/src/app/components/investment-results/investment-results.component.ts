import { Component, Input } from '@angular/core';
import { UserService } from '../user/user.service';
import { InvestmentResultsType } from './investment-results.model';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  @Input({ required: true }) investmentResults: InvestmentResultsType[] = [];
}
