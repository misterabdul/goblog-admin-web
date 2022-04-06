import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PageDetailed, PageFormData } from 'src/app/types/page.type';

import { PageViewerComponent } from '../viewer/viewer.component';

@Component({
  selector: 'app-component-page-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class PageEditorComponent extends PageViewerComponent {
  private _mode: 'create' | 'update';
  private _submitting: boolean;
  private _formModel: FormModel;

  @Output()
  public ngSubmit: EventEmitter<PageFormData>;

  constructor() {
    super();

    this._mode = 'create';
    this._submitting = false;
    this._formModel = new FormModel();

    this.ngSubmit = new EventEmitter<PageFormData>();
  }

  public save(publishNow: boolean) {
    if (!this._submitting) {
      this.ngSubmit.emit(this._formModel.getFormData(publishNow));
    }
  }

  get formModel(): FormModel {
    return this._formModel;
  }

  get mode(): 'create' | 'update' {
    return this._mode;
  }

  @Input()
  set page(page: PageDetailed | null) {
    this._page = page;
    if (this._page !== null) {
      this._formModel.fillFormData(this._page);
      this._mode = 'update';
    } else {
      this._formModel.emptyFormData();
      this._mode = 'create';
    }
  }

  get page(): PageDetailed {
    return this._page!;
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
  public title: FormControl;
  public slug: FormControl;
  public content: FormControl;
  public canPublish: boolean;

  constructor() {
    this.title = new FormControl(null, [Validators.required]);
    this.slug = new FormControl(null, []);
    this.content = new FormControl(null, []);
    this.canPublish = false;

    this.emptyFormData();
  }

  public emptyFormData() {
    this.title.setValue(null);
    this.slug.setValue(null);
    this.content.setValue(null);
  }

  public fillFormData(page: PageDetailed) {
    this.title.setValue(page.title!);
    this.slug.setValue(page.slug!);
    this.content.setValue(page.content!);

    if (page.publishedAt === null) {
      this.canPublish = true;
    } else {
      this.canPublish = false;
    }
  }

  public getFormData(publishNow?: boolean): PageFormData {
    return new PageFormData(
      this.title.value,
      this.slug.value,
      this.content.value,
      publishNow
    );
  }

  public submitting() {
    this.title.disable();
    this.slug.disable();
    this.content.disable();
  }

  public submitDone() {
    this.title.enable();
    this.slug.enable();
    this.content.enable();
  }
}
