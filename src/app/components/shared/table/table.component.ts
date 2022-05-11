import { Directive, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as dayjs from 'dayjs';

@Directive()
export abstract class CommonTableComponent<T> implements OnInit {
  protected _activatedRouteService: ActivatedRoute;

  protected _isTrash: boolean;
  protected _resources: Array<T> | null;
  protected _affix: number;
  protected _displayedColumns: Array<String>;

  constructor(activatedRouteService: ActivatedRoute) {
    this._activatedRouteService = activatedRouteService;

    this._isTrash = false;
    this._resources = null;
    this._affix = 0;
    this._displayedColumns = [];
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
  set resources(resources: Array<T>) {
    this._resources = resources;
  }

  get isTrash(): boolean {
    return this._isTrash;
  }

  get resources(): Array<T> {
    return this._resources!;
  }

  get affix(): number {
    return this._affix;
  }

  get displayedColumns(): Array<String> {
    return this._displayedColumns;
  }
}
