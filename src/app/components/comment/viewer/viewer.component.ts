import { Component, Input } from '@angular/core';

import { CommentDetailed } from 'src/app/types/comment.type';

@Component({
  selector: 'app-component-comment-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class CommentViewerComponent {
  protected _comment: CommentDetailed | null;

  constructor() {
    this._comment = null;
  }

  @Input()
  set comment(comment: CommentDetailed) {
    this._comment = comment;
  }

  get comment(): CommentDetailed {
    return this._comment!;
  }
}
