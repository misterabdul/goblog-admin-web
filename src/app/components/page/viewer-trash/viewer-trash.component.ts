import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageDetailed } from 'src/app/types/page.type';
import { PageViewerComponent } from '../viewer/viewer.component';

@Component({
  selector: 'app-component-page-viewer-trash',
  templateUrl: './viewer-trash.component.html',
  styleUrls: ['./viewer-trash.component.scss'],
})
export class PageViewerTrashComponent extends PageViewerComponent {
  private _submitting: boolean;
  private _mode: 'delete' | 'restore';

  @Output()
  public ngSubmit: EventEmitter<PageDetailed>;

  constructor() {
    super();

    this._submitting = false;
    this._mode = 'delete';

    this.ngSubmit = new EventEmitter<PageDetailed>();
  }

  public submit() {
    this.ngSubmit.emit(this._page ?? undefined);
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
