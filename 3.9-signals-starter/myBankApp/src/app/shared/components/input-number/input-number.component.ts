import {
  Component,
  ChangeDetectionStrategy,
  Optional,
  Self,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent implements ControlValueAccessor {
  @Input() placeholder = 'Placeholder';
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
