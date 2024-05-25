import {
  Component,
  ChangeDetectionStrategy,
  Optional,
  Self,
  input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent implements ControlValueAccessor {
  placeholder = input('Placeholder');
  value!: number;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  writeValue(value: number) {
    this.value = value;
  }

  registerOnChange() {}

  registerOnTouched() {}
}
