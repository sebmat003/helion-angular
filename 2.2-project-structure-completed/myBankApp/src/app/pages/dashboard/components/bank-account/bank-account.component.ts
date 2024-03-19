import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bank-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
})
export class BankAccountComponent {
  account = {
    name: 'Main account',
    balance: 10000,
    currency: 'PLN',
    status: 'active'
  }
}
