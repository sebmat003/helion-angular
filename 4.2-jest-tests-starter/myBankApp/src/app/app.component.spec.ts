import { AppComponent } from './app.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [RouterOutlet],
    declareComponent: false,
    detectChanges: false,
  });

  beforeEach(() => (spectator = createComponent()));

  it('Should match the snapshot', () => {
    spectator.detectChanges();

    expect(spectator.fixture).toMatchSnapshot();
  });
});
