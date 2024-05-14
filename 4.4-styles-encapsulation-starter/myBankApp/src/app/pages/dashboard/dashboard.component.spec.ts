import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { DashboardComponent } from './dashboard.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { TimerComponent } from './components/timer/timer.component';
import { BankAccountHttpService } from './services/bank-account-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../shared/services/auth.service';
import { provideRouter, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HttpClient } from '@angular/common/http';

describe('DashboardComponent', () => {
  let spectator: Spectator<DashboardComponent>;
  let component: DashboardComponent;
  let authService: AuthService;
  let httpClient: HttpClient;
  let router: Router;

  const createComponent = createComponentFactory({
    component: DashboardComponent,
    imports: [
      CommonModule,
      BankAccountComponent,
      TimerComponent,
      HttpClientTestingModule,
      AsyncPipe,
    ],
    providers: [
      AuthService,
      provideRouter([
        {
          path: 'login',
          component: LoginComponent,
        },
      ]),
      BankAccountHttpService,
    ],
    declareComponent: false,
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    httpClient = spectator.inject(HttpClient);
    authService = spectator.inject(AuthService);
    router = spectator.inject(Router);
  });

  describe('when the accounts are loading', () => {
    it('should match the snapshot', () => {
      spectator.detectChanges();

      expect(spectator.fixture).toMatchSnapshot();
    });
  });

  describe('when bank accounts are loaded', () => {
    beforeEach(() => {
      const rxjs = jest.requireActual('rxjs');
      jest.spyOn(rxjs, 'delay').mockImplementation(() => (s: any) => s);
    });

    it('should match the snapshot', () => {
      component.accountsChange$.next();

      spectator.detectChanges();

      expect(spectator.fixture).toMatchSnapshot();
    });

    it('should logout and redirect to login page', () => {
      jest.spyOn(authService, 'logout');
      jest.spyOn(router, 'navigateByUrl');

      spectator.click(spectator.query('.logout') as HTMLButtonElement);

      expect(authService.logout).toHaveBeenCalledTimes(1);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
    });

    it('should send dummy request to retrieve an error', () => {
      jest.spyOn(httpClient, 'get');

      spectator.click(spectator.queryLast('button') as HTMLButtonElement);

      expect(httpClient.get).toHaveBeenCalledWith('dummy/api');
    });

    describe('deleteAccount button', () => {
      let deleteButton: HTMLButtonElement;

      beforeEach(() => {
        spectator.detectChanges();
      });

      it('should be disabled when the status is inactive', () => {
        deleteButton = spectator.queryLast(
          'app-bank-account button',
        ) as HTMLButtonElement;

        expect(deleteButton).toBeDisabled();
      });

      it('should correctly delete the account', () => {
        deleteButton = spectator.query(
          'app-bank-account button',
        ) as HTMLButtonElement;

        spectator.click(deleteButton);
        spectator.detectChanges();

        expect(spectator.queryAll('app-bank-account').length).toBe(3);
      });
    });

    it('should correctly withdraw money from one of the accounts', () => {
      const accountIndex = 1;
      spectator.detectChanges();
      const inputNumber = spectator.queryAll('.withdraw input')[
        accountIndex
      ] as HTMLInputElement;

      inputNumber.value = '30000';
      inputNumber.dispatchEvent(new Event('input'));
      spectator.detectChanges();
      spectator.click(
        spectator.queryAll('.withdraw button')[accountIndex] as HTMLElement,
      );
      spectator.detectChanges();

      expect(
        spectator.queryAll('.bank-account__balance span')[accountIndex]
          ?.textContent,
      ).toBe('2000 ZŁOTYCH');
    });
  });
});
