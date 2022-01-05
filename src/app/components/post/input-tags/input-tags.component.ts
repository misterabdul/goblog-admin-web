import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { CanDisable } from '@angular/material/core';

@Component({
  selector: 'app-component-post-input-tags',
  templateUrl: './input-tags.component.html',
  styleUrls: ['./input-tags.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PostInputTagsComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PostInputTagsComponent),
      multi: true,
    },
  ],
})
export class PostInputTagsComponent
  implements CanDisable, ControlValueAccessor, Validator
{
  private _isDisabled: boolean;
  private _placeholder: string;
  private _separator: any;
  private _separatorChars: string[];
  private _tags: string[];
  private _onChangedCallback: (value: any) => void;
  private _onTouchedCallback: () => void;

  constructor() {
    this._isDisabled = false;
    this._placeholder = 'Tags...';
    this._separator = [COMMA, ENTER] as const;
    this._separatorChars = [',', '\n'];
    this._tags = [] as string[];
    this._onChangedCallback = (value: any): void => {};
    this._onTouchedCallback = (): void => {};
  }

  public add(event: MatChipInputEvent): void {
    let sanitized = event.value;
    this._separatorChars.forEach((value): void => {
      sanitized = sanitized.replace(value, '');
    });
    if (sanitized.length > 0) this._tags.push(sanitized);
    event.chipInput?.clear();
  }

  public remove(tag: string) {
    const found = this._tags.indexOf(tag, 0);
    if (found > -1) this._tags.splice(found, 1);
  }

  public writeValue(value: any): void {
    this._tags = this._tags.concat(value);
    this._onChangedCallback(this._tags);
  }

  public registerOnChange(fn: any): void {
    this._onChangedCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  public registerOnValidatorChange(fn: () => void): void {}

  @Input()
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
  }

  @Input()
  set disabled(isDisabled: boolean) {
    this.setDisabledState(isDisabled);
  }

  @Input()
  set separator(separator: any) {
    this._separator = separator;
    this._separatorChars = (separator as number[]).map<string>(
      (value: number): string => {
        return String.fromCharCode(value);
      }
    );
  }

  @Input()
  set value(tags: String[] | null) {
    this.writeValue(tags);
  }

  set tags(tags: string[]) {
    this._tags = tags;
  }

  get disabled(): boolean {
    return this._isDisabled;
  }

  get placeholder(): string {
    return this._placeholder;
  }

  get separator(): any {
    return this._separator;
  }

  get tags(): string[] {
    return this._tags;
  }
}
