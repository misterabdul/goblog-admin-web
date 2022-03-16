import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { DarkModeService } from 'src/app/services/darkmode.service';
import { LoginFormData } from 'src/app/types/user.type';

@Component({
  selector: 'app-component-login-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginLoginFormComponent {
  private _isDarkMode: boolean;
  private _formControl: LoginFormControl;
  private _submitting: boolean;

  @Output()
  public ngSubmit: EventEmitter<LoginFormData>;

  constructor(darkModeService: DarkModeService) {
    this._isDarkMode = false;
    this._formControl = new LoginFormControl();
    this._submitting = false;

    darkModeService.darkModeSubject.subscribe({
      next: (isDarkMode) => {
        this._isDarkMode = isDarkMode;
      },
    });

    this.ngSubmit = new EventEmitter<LoginFormData>();
  }

  public submit(): void {
    this.ngSubmit.emit({
      username: this._formControl.email.value,
      password: this._formControl.password.value,
    });
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }

  @Input()
  set submitting(submitting: boolean) {
    this._submitting = submitting;
    if (this._submitting) this._formControl.disableAll();
    else this._formControl.enableAll();
  }

  get submitting(): boolean {
    return this._submitting;
  }

  get formControl(): LoginFormControl {
    return this._formControl;
  }
}

class LoginFormControl {
  private _emailInput: FormControl;
  private _passwordInput: FormControl;

  constructor() {
    this._emailInput = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this._passwordInput = new FormControl('', [Validators.required]);
  }

  public disableAll() {
    this._emailInput.disable();
    this._passwordInput.disable();
  }

  public enableAll() {
    this._emailInput.enable();
    this._passwordInput.enable();
  }

  get email(): FormControl {
    return this._emailInput;
  }

  get password(): FormControl {
    return this._passwordInput;
  }

  get emailError(): string | null {
    const input = this._emailInput;
    switch (true) {
      case input.hasError('required'):
        return 'Email required';
      case input.hasError('email'):
        return 'Email invalid';
      default:
        return null;
    }
  }

  get passwordError(): string | null {
    const input = this._passwordInput;
    switch (true) {
      case input.hasError('required'):
        return 'Password required.';
      default:
        return null;
    }
  }
}
