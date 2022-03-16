import { Component, Input } from '@angular/core';
import * as dayjs from 'dayjs';

import { CategoryDetailed } from 'src/app/types/category.type';

@Component({
  selector: 'app-component-category-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class CategoryTableComponent {
  private _isTrash: boolean;
  private _categories: Array<CategoryDetailed> | null;
  private _displayedColumns: Array<String>;

  constructor() {
    this._isTrash = false;
    this._categories = null;
    this._displayedColumns = ['no', 'slug', 'name', 'created-at', 'action'];
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
  set categories(categories: Array<CategoryDetailed>) {
    this._categories = categories;
  }

  get isTrash(): boolean {
    return this._isTrash;
  }

  get categories(): Array<CategoryDetailed> {
    return this._categories!;
  }

  get displayedColumns(): Array<String> {
    return this._displayedColumns;
  }
}
