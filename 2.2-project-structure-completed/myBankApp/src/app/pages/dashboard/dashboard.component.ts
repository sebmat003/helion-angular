import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BankAccountComponent } from './components/bank-account/bank-account.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BankAccountComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {}
