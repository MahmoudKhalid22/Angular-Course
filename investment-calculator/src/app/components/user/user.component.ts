import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { UserService } from './user.service';
import { InvestmentResultsComponent } from '../investment-results/investment-results.component';
import { InvestmentResultsType } from '../investment-results/investment-results.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, InvestmentResultsComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  initialInvestment: number = 0;
  annualInvestment: number = 0;
  expectedReturn: number = 0;
  duration: number = 0;
  investmentResults: InvestmentResultsType[] = [];

  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  calculateResults() {
    this.investmentResults = this.userService.calculateInvestmentResults(
      this.initialInvestment,
      this.annualInvestment,
      this.expectedReturn,
      this.duration
    );
  }
}
