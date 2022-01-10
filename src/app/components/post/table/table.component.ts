import { Component, Input } from '@angular/core';
import * as dayjs from 'dayjs';

import { PostDetailed } from 'src/app/types/post.type';

@Component({
  selector: 'app-component-post-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class PostTableComponent {
  private _isTrash: boolean;
  private _posts: Array<PostDetailed> | null;
  private _displayedColumns: Array<String>;

  constructor() {
    this._isTrash = false;
    this._posts = null;
    this._displayedColumns = [
      'no',
      'title',
      'category',
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
  set showPublished(showPublished: boolean) {
    if (showPublished) {
      this._displayedColumns = [
        'no',
        'title',
        'category',
        'created-at',
        'published-at',
        'action',
      ];
    }
  }

  @Input()
  set posts(posts: Array<PostDetailed>) {
    this._posts = posts;
  }

  get isTrash(): boolean {
    return this._isTrash;
  }

  get posts(): Array<PostDetailed> {
    return this._posts!;
  }

  get displayedColumns(): Array<String> {
    return this._displayedColumns;
  }
}
