import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CommentDetailed } from 'src/app/types/comment.type';

@Component({
  selector: 'app-component-comment-tab-comment',
  templateUrl: './tab-comment.component.html',
  styleUrls: ['./tab-comment.component.scss'],
})
export class CommentTabCommentComponent implements AfterViewInit {
  private _isLoading: boolean;
  private _comments: Array<CommentDetailed> | null;

  @Output()
  public isDisplayed = new EventEmitter<boolean>();

  constructor() {
    this._isLoading = false;
    this._comments = null;
  }

  ngAfterViewInit(): void {
    this.isDisplayed.emit(true);
  }

  @Input()
  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }

  @Input()
  set comments(comments: Array<CommentDetailed>) {
    this._comments = comments;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get comments(): Array<CommentDetailed> {
    return this._comments!;
  }

  get hasContents(): boolean {
    return this._comments !== null;
  }
}
