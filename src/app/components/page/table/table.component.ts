import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as dayjs from 'dayjs';

import { PageDetailed } from 'src/app/types/page.type';

@Component({
  selector: 'app-component-page-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class PageTableComponent implements OnInit {
  private _activatedRouteService: ActivatedRoute;

  private _isTrash: boolean;
  private _pages: Array<PageDetailed> | null;
  private _affix: number;
  private _displayedColumns: Array<String>;

  constructor(activatedRouteService: ActivatedRoute) {
    this._activatedRouteService = activatedRouteService;

    this._isTrash = false;
    this._pages = null;
    this._affix = 0;
    this._displayedColumns = ['no', 'title', 'created-at', 'action'];
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
  set showPublished(showPublished: boolean) {
    if (showPublished) {
      this._displayedColumns = [
        'no',
        'title',
        'created-at',
        'published-at',
        'action',
      ];
    }
  }

  @Input()
  set pages(pages: Array<PageDetailed>) {
    this._pages = pages;
  }

  get pages(): Array<PageDetailed> {
    return this._pages!;
  }

  get affix(): number {
    return this._affix;
  }

  get isTrash(): boolean {
    return this._isTrash;
  }

  get displayedColumns(): Array<String> {
    return this._displayedColumns;
  }
}
