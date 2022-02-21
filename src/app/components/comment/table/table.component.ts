import { Component, Input } from '@angular/core';
import * as dayjs from 'dayjs';

import { CommentDetailed } from 'src/app/types/comment.type';

@Component({
  selector: 'app-component-comment-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class CommentTableComponent {
  private _isTrash: boolean;
  private _comments: Array<CommentDetailed> | null;
  private _displayedColumns: Array<String>;

  constructor() {
    this._isTrash = false;
    this._comments = null;
    this._displayedColumns = [
      'no',
      'name',
      'email',
      'content',
      'created-at',
      'action',
    ];
  }

  public properDate(rawDate: string): string {
    //TODO: more research on date time utility in javascript
    return dayjs(rawDate).format('YYYY MMM DD');
  }

  public properTime(rawDate: string): string {
    //TODO: more research on date time utility in javascript
    return dayjs(rawDate).format('HH:mm:ss');
  }

  @Input()
  set isTrash(isTrash: boolean) {
    this._isTrash = isTrash;
  }

  @Input()
  set comments(comments: Array<CommentDetailed>) {
    this._comments = comments;
  }

  get isTrash(): boolean {
    return this._isTrash;
  }

  get comments(): Array<CommentDetailed> {
    return this._comments!;
  }

  get displayedColumns(): Array<String> {
    return this._displayedColumns;
  }
}
