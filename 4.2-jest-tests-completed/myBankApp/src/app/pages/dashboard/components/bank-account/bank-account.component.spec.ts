import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BankAccountComponent } from './bank-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BalancePipe } from '../../pipes/balance.pipe';
import { CardStatusDirective } from '../../../../shared/directives/card-status.directive';
import { InputNumberComponent } from '../../../../shared/components/input-number/input-number.component';
import { bankAccountMock } from '../../testing/bank-accounts.mocks';

describe('BankAccountComponent', () => {
  let spectator: Spectator<BankAccountComponent>;
  let component: BankAccountComponent;

  const createComponent = createComponentFactory({
    component: BankAccountComponent,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      BalancePipe,
      AsyncPipe,
      CardStatusDirective,
      InputNumberComponent,
    ],
    declareComponent: false,
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should match the snapshot', () => {
    component.account = bankAccountMock;

    spectator.detectChanges();

    expect(spectator.fixture).toMatchSnapshot();
  });

  it('should show withdraw warning', () => {
    component.account = bankAccountMock;
    spectator.detectChanges();

    const inputNumber = spectator.query('.withdraw input') as HTMLInputElement;
    inputNumber.value = '1234';
    inputNumber.dispatchEvent(new Event('input'));

    expect(component.showWithdrawWarning).toBe(true);
  });

  it('should correctly withdraw money from the account', () => {
    component.account = bankAccountMock;
    spectator.detectChanges();
    jest.spyOn(component.form, 'reset');
    jest.spyOn(component.withdrawControl, 'addValidators');
    const inputNumber = spectator.query('.withdraw input') as HTMLInputElement;
    inputNumber.value = '4999';
    inputNumber.dispatchEvent(new Event('input'));
    spectator.detectChanges();

    spectator.click(spectator.query('.withdraw button') as HTMLElement);
    spectator.detectChanges();

    expect(component.form.reset).toHaveBeenCalledTimes(1);
    expect(component.withdrawControl.addValidators).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['Minimum value is 1', -1],
    ['Insufficient money in the account', 5001],
  ])('should show an error: %s, when the input value is %s', (error, value) => {
    component.account = bankAccountMock;
    spectator.detectChanges();

    component.withdrawControl.setValue(value);
    component.withdrawControl.markAsDirty();
    spectator.detectComponentChanges();

    expect(spectator.query('.withdraw + p')?.textContent).toBe(error);
  });
});
