import { Pipe, PipeTransform } from '@angular/core';

const translatedCurrency: any = {
  PLN: 'złotych',
  EUR: 'euro',
  USD: 'dolarów',
};

@Pipe({
  name: 'balance',
  standalone: true,
})
export class BalancePipe implements PipeTransform {
  transform(value: number, currency: any, uppercase = false): string {
    let balance = value + ' ' + translatedCurrency[currency];
    if (uppercase) {
      balance = balance.toUpperCase();
    }

    return balance;
  }
}
