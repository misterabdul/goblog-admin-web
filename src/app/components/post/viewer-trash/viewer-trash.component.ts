import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PostDetailed } from 'src/app/types/post.type';
import { PostViewerComponent } from '../viewer/viewer.component';

@Component({
  selector: 'app-component-post-trash-viewer',
  templateUrl: './viewer-trash.component.html',
  styleUrls: ['./viewer-trash.component.scss'],
})
export class PostTrashViewerComponent extends PostViewerComponent {
  private _submitting: boolean;
  private _mode: 'delete' | 'restore';

  @Output()
  public ngSubmit: EventEmitter<PostDetailed>;

  constructor() {
    super();

    this._submitting = false;
    this._mode = 'delete';

    this.ngSubmit = new EventEmitter<PostDetailed>();
  }

  public submit() {
    this.ngSubmit.emit(this._post ?? undefined);
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
