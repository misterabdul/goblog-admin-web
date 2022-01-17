import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';

import { UserService } from 'src/app/services/user.service';
import { Response } from 'src/app/types/response.type';
import { UserDetailed, UserFormData } from 'src/app/types/user.type';
import { ValidatorUtils } from 'src/app/utils/validator.util';
import { UserViewerComponent } from '../viewer/viewer.component';

@Component({
  selector: 'app-component-user-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class UserEditorComponent extends UserViewerComponent {
  private _formModel: FormModel;
  private _mode: 'create' | 'update';

  constructor(
    routerService: Router,
    snackBarService: MatSnackBar,
    userService: UserService
  ) {
    super(routerService, snackBarService, userService);

    this._formModel = new FormModel();
    this._mode = 'create';
  }

  private submitForm(): Observable<Response<UserDetailed>> {
    return this._userService.submitCreateUser(this._formModel.formData);
  }

  private submitFormUpdate(): Observable<void> {
    return this._userService.submitUpdateUser(
      this._user?.uid!,
      this._formModel.formData
    );
  }

  public save() {
    if (this._formModel.valid && !this._formModel.isSubmitting) {
      this._formModel.submitting();

      let submitFunc: Observable<Response<UserDetailed> | void>;
      let successMsg: string;
      switch (true) {
        default:
        case this._mode === 'create':
          submitFunc = this.submitForm();
          successMsg = 'User created.';
          break;
        case this._mode === 'update':
          submitFunc = this.submitFormUpdate();
          successMsg = 'User updated.';
          break;
      }

      submitFunc
        .pipe(
          finalize(() => {
            this._formModel.submitDone();
          })
        )
        .subscribe(() => {
          this._snackBarService.open(successMsg, undefined, {
            duration: SnackBarConfig.SUCCESS_DURATIONS,
          });
          this._routerService.navigate(['/user']);
        }, this._commonHttpErrorHandler);
    }
  }

  get userForms(): FormGroup {
    return this._formModel.formGroup;
  }

  get isSubmitting(): boolean {
    return this._formModel.isSubmitting;
  }

  get mode(): 'create' | 'update' {
    return this._mode;
  }

  get submitBtnLbl(): string {
    switch (true) {
      default:
      case this._mode === 'create':
        return 'Create';
      case this._mode === 'update':
        return 'Update';
    }
  }

  @Input()
  set user(user: UserDetailed | null) {
    this._user = user;
    if (this._user !== null) {
      this._formModel.fillFormData(this._user);
      this._mode = 'update';
    } else {
      this._formModel.emptyFormData();
      this._mode = 'create';
    }
  }

  get user(): UserDetailed {
    return this._user!;
  }
}

class FormModel {
  public formGroup: FormGroup;
  public isSubmitting: boolean;

  constructor() {
    this.formGroup = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.min(5),
        Validators.max(16),
        ValidatorUtils.alnum,
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null, [Validators.max(50)]),
      lastName: new FormControl(null, [Validators.max(50)]),
      password: new FormControl(null, [
        Validators.required,
        Validators.min(8),
        Validators.max(32),
      ]),
      passwordConfirm: new FormControl(null, [
        ValidatorUtils.match('password'),
      ]),
      roles: new FormControl([], []),
    });
    this.isSubmitting = false;
  }

  public emptyFormData() {
    this.formGroup.get('username')?.setValue(null);
    this.formGroup.get('email')?.setValue(null);
    this.formGroup.get('firstName')?.setValue(null);
    this.formGroup.get('lastName')?.setValue(null);
    this.formGroup.get('password')?.setValue(null);
    this.formGroup.get('passwordConfirm')?.setValue(null);
    this.formGroup.get('roles')?.setValue([]);
  }

  public fillFormData(user: UserDetailed) {
    this.formGroup.get('username')?.setValue(user.username!);
    this.formGroup.get('email')?.setValue(user.email!);
    this.formGroup.get('firstName')?.setValue(user.firstName!);
    this.formGroup.get('lastName')?.setValue(user.lastName!);
    this.formGroup.get('roles')?.setValue(
      user.roles!.map<number>((role) => {
        return role.level!;
      })
    );

    this.formGroup.get('password')?.removeValidators(Validators.required);
    this.formGroup.get('password')?.updateValueAndValidity({ onlySelf: true });
  }

  public submitting() {
    this.formGroup.get('username')?.disable();
    this.formGroup.get('email')?.disable();
    this.formGroup.get('firstName')?.disable();
    this.formGroup.get('lastName')?.disable();
    this.formGroup.get('password')?.disable();
    this.formGroup.get('passwordConfirm')?.disable();
    this.formGroup.get('roles')?.disable();
    this.isSubmitting = true;
  }

  public submitDone() {
    this.formGroup.get('username')?.enable();
    this.formGroup.get('email')?.enable();
    this.formGroup.get('firstName')?.enable();
    this.formGroup.get('lastName')?.enable();
    this.formGroup.get('password')?.enable();
    this.formGroup.get('passwordConfirm')?.enable();
    this.formGroup.get('roles')?.enable();
    this.isSubmitting = false;
  }

  get valid(): boolean {
    return this.formGroup.valid;
  }

  get invalid(): boolean {
    return this.formGroup.invalid;
  }

  get formData(): UserFormData {
    return new UserFormData(
      this.formGroup.get('username')?.value,
      this.formGroup.get('email')?.value,
      this.formGroup.get('firstName')?.value,
      this.formGroup.get('lastName')?.value,
      this.formGroup.get('password')?.value,
      this.formGroup.get('passwordConfirm')?.value,
      this.formGroup.get('roles')?.value
    );
  }
}
