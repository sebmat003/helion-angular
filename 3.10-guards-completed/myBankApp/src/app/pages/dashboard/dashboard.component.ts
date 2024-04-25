import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { BankAccountHttpService } from './services/bank-account-http.service';
import { BehaviorSubject, combineLatest, map, switchMap } from 'rxjs';
import { TimerComponent } from "./components/timer/timer.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    providers: [BankAccountHttpService],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, BankAccountComponent, TimerComponent]
})
export class DashboardComponent {
  private readonly bankAccountHttpService = inject(BankAccountHttpService);
  accountsChange$ = new BehaviorSubject<void>(undefined);
  accounts$ = this.accountsChange$
    .pipe(
      switchMap(() =>
        combineLatest([
          this.bankAccountHttpService.getBankAccounts(),
          this.bankAccountHttpService.getVisibleAccounts(),
        ]),
      ),
    )
    .pipe(
      map(([accounts, visible]) =>
        accounts.filter((account) => visible.includes(account.id)),
      ),
    );

  onWithdrawMoney(accountId: number, withdrawAmount: number) {
    this.bankAccountHttpService.withdrawMoney(accountId, withdrawAmount);
  }

  deleteAccount(accountId: number) {
    this.bankAccountHttpService.deleteAccount(accountId);
    this.accountsChange$.next();
  }
}
