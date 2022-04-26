import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {
  CategoryDetailed,
  CategoryFormData,
} from 'src/app/types/category.type';
import { ValidatorUtils } from 'src/app/utils/validator.util';
import { CategoryViewerComponent } from '../viewer/viewer.component';

@Component({
  selector: 'app-component-category-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class CategoryEditorComponent extends CategoryViewerComponent {
  private _submitting: boolean;
  private _mode: 'create' | 'update';
  private _formModel: FormModel;

  @Output()
  public ngSubmit: EventEmitter<CategoryFormData>;

  constructor() {
    super();

    this._submitting = false;
    this._formModel = new FormModel();
    this._mode = 'create';

    this.ngSubmit = new EventEmitter<CategoryFormData>();
  }

  public save() {
    if (this._formModel.valid && !this._formModel.isSubmitting)
      this.ngSubmit.emit(this._formModel.formData);
  }

  get categoryForms(): FormGroup {
    return this._formModel.formGroup;
  }

  get isSubmitting(): boolean {
    return this._formModel.isSubmitting;
  }

  get mode(): 'create' | 'update' {
    return this._mode;
  }

  @Input()
  set category(category: CategoryDetailed | null) {
    super.category = category!;
    if (this._category !== null) {
      this._formModel.fillFormData(this._category);
      this._mode = 'update';
    } else {
      this._formModel.emptyFormData();
      this._mode = 'create';
    }
  }

  get category(): CategoryDetailed | null {
    return super.category;
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
      slug: new FormControl(null, [
        Validators.required,
        Validators.max(127),
        ValidatorUtils.alnum,
      ]),
      name: new FormControl(null, [Validators.required, Validators.max(127)]),
    });
    this.isSubmitting = false;
  }

  public emptyFormData() {
    this.formGroup.get('slug')?.setValue(null);
    this.formGroup.get('name')?.setValue(null);
  }

  public fillFormData(category: CategoryDetailed) {
    this.formGroup.get('slug')?.setValue(category.slug);
    this.formGroup.get('name')?.setValue(category.name);
  }

  public submitting() {
    this.formGroup.get('slug')?.disable();
    this.formGroup.get('name')?.disable();
    this.isSubmitting = true;
  }

  public submitDone() {
    this.formGroup.get('slug')?.enable();
    this.formGroup.get('name')?.enable();
    this.isSubmitting = false;
  }

  get valid(): boolean {
    return this.formGroup.valid;
  }

  get invalid(): boolean {
    return this.formGroup.invalid;
  }

  get formData(): CategoryFormData {
    return new CategoryFormData(
      this.formGroup.get('slug')?.value,
      this.formGroup.get('name')?.value
    );
  }
}
