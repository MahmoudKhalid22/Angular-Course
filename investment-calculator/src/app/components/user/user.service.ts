import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  calculateInvestmentResults(
    initialInvestment: number,
    annualInvestment: number,
    expectedReturn: number,
    duration: number
  ) {
    console.log(initialInvestment, annualInvestment, expectedReturn, duration);
    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
    console.log(annualData);
    return annualData;
  }
}
