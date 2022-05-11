import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as dayjs from 'dayjs';

import { CommentDetailed } from 'src/app/types/comment.type';

@Component({
  selector: 'app-component-comment-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class CommentTableComponent implements OnInit {
  private _activatedRouteService: ActivatedRoute;

  private _isTrash: boolean;
  private _comments: Array<CommentDetailed> | null;
  private _affix: number;
  private _displayedColumns: Array<String>;

  constructor(activatedRouteService: ActivatedRoute) {
    this._activatedRouteService = activatedRouteService;

    this._isTrash = false;
    this._comments = null;
    this._affix = 0;
    this._displayedColumns = [
      'no',
      'name',
      'email',
      'content',
      'created-at',
      'action',
    ];
  }

  ngOnInit(): void {
    this._activatedRouteService.queryParams.subscribe((queryParams) => {
      const page = queryParams.page ?? 1;
      const show = queryParams.show ?? 25;
      this._affix = (page - 1) * show;
    });
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

  get affix(): number {
    return this._affix;
  }

  get displayedColumns(): Array<String> {
    return this._displayedColumns;
  }
}
