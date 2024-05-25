import { BankAccount, Currency } from '../models/dashboard.models';

export const bankAccountMock: BankAccount = {
  id: 1,
  status: 'active',
  name: 'My account',
  balance: 5000,
  currency: Currency.PLN,
};
