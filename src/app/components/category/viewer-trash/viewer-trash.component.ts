import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CategoryDetailed } from 'src/app/types/category.type';
import { CategoryViewerComponent } from '../viewer/viewer.component';

@Component({
  selector: 'app-component-category-viewer-trash',
  templateUrl: './viewer-trash.component.html',
  styleUrls: ['./viewer-trash.component.scss'],
})
export class CategoryViewerTrashComponent extends CategoryViewerComponent {
  private _submitting: boolean;
  private _mode: 'delete' | 'restore';

  @Output()
  public ngSubmit: EventEmitter<CategoryDetailed>;

  constructor() {
    super();

    this._submitting = false;
    this._mode = 'delete';

    this.ngSubmit = new EventEmitter<CategoryDetailed>();
  }

  public submit() {
    if (!this._submitting && this._category) {
      this.ngSubmit.emit(this._category);
    }
  }

  @Input()
  set mode(mode: 'delete' | 'restore') {
    this._mode = mode;
  }

  get mode(): 'delete' | 'restore' {
    return this._mode;
  }

  @Input()
  set submitting(submitting: boolean) {
    this._submitting = submitting;
  }

  get submitting(): boolean {
    return this._submitting;
  }
}
