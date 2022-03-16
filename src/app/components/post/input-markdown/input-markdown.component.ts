import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { CanDisable } from '@angular/material/core';

import { DarkModeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-component-post-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PostInputMarkdownComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PostInputMarkdownComponent),
      multi: true,
    },
  ],
})
export class PostInputMarkdownComponent
  implements CanDisable, ControlValueAccessor, Validator
{
  private _isDarkMode: boolean;
  private _isDisabled: boolean;
  private _editorMode: 'Default' | 'Vim';
  private _showPreview: boolean;
  private _markdownString: String | undefined;
  private _onChangedCallback: (value: any) => void;
  private _onTouchedCallback: () => void;

  constructor(darkModeService: DarkModeService) {
    this._isDarkMode = false;
    this._isDisabled = false;
    this._editorMode = 'Default';
    this._showPreview = false;
    this._markdownString = '';
    this._onChangedCallback = (value: any): void => {};
    this._onTouchedCallback = (): void => {};

    darkModeService.darkModeSubject.subscribe({
      next: (isDarkMode) => {
        this._isDarkMode = isDarkMode;
      },
    });
  }

  writeValue(value: any): void {
    this._markdownString = value;
    this._onChangedCallback(this._markdownString);
  }

  registerOnChange(fn: any): void {
    this._onChangedCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {}

  public toggleEditorMode(): void {
    this._editorMode = this._editorMode === 'Default' ? 'Vim' : 'Default';
  }

  public toggleEditorPreview(): void {
    this._showPreview = !this._showPreview;
  }

  @Input()
  set disabled(isDisabled: boolean) {
    this.setDisabledState(isDisabled);
  }

  @Input()
  set value(value: String | null) {
    this.writeValue(value);
  }

  set markdownString(markdownString: String | undefined) {
    this._markdownString = markdownString;
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }

  get disabled(): boolean {
    return this._isDisabled;
  }

  get editorMode(): string {
    return this._editorMode;
  }

  get showPreview(): boolean {
    return this._showPreview;
  }

  get markdownString(): String | undefined {
    return this._markdownString;
  }
}
