import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommentDetailed } from 'src/app/types/comment.type';
import { CommentViewerComponent } from '../viewer/viewer.component';

@Component({
  selector: 'app-component-comment-viewer-trash',
  templateUrl: './viewer-trash.component.html',
  styleUrls: ['./viewer-trash.component.scss'],
})
export class CommentViewerTrashComponent extends CommentViewerComponent {
  private _submitting: boolean;
  private _mode: 'delete' | 'restore';

  @Output()
  public ngSubmit: EventEmitter<CommentDetailed>;

  constructor() {
    super();

    this._submitting = false;
    this._mode = 'delete';

    this.ngSubmit = new EventEmitter<CommentDetailed>();
  }

  public submit() {
    if (!this._submitting && this._comment) {
      this.ngSubmit.emit(this._comment);
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
