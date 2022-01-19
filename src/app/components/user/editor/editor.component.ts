import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserDetailed, UserFormData } from 'src/app/types/user.type';
import { ValidatorUtils } from 'src/app/utils/validator.util';
import { UserViewerComponent } from '../viewer/viewer.component';

@Component({
  selector: 'app-component-user-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class UserEditorComponent extends UserViewerComponent {
  private _submitting: boolean;
  private _mode: 'create' | 'update';
  private _formModel: FormModel;

  @Output()
  public ngSubmit: EventEmitter<UserFormData>;

  constructor() {
    super();

    this._submitting = false;
    this._formModel = new FormModel();
    this._mode = 'create';

    this.ngSubmit = new EventEmitter<UserFormData>();
  }

  public save() {
    if (this._formModel.valid && !this._formModel.isSubmitting)
      this.ngSubmit.emit(this._formModel.formData);
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

  @Input()
  set user(user: UserDetailed | null) {
    super.user = user;
    if (this._user !== null) {
      this._formModel.fillFormData(this._user);
      this._mode = 'update';
    } else {
      this._formModel.emptyFormData();
      this._mode = 'create';
    }
  }

  @Input()
  set submitting(submitting: boolean) {
    this._submitting = submitting;
    if (this._submitting) this._formModel.submitting();
    else this._formModel.submitDone();
  }

  get submitting(): boolean {
    return this._submitting;
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
