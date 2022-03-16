import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CategoryDetailed } from 'src/app/types/category.type';

@Component({
  selector: 'app-component-category-tab-active',
  templateUrl: './tab-active.component.html',
  styleUrls: ['./tab-active.component.scss'],
})
export class CategoryTabActiveComponent implements AfterViewInit {
  private _isLoading: boolean;
  private _categories: Array<CategoryDetailed> | null;

  @Output()
  public isDisplayed = new EventEmitter<boolean>();

  constructor() {
    this._isLoading = false;
    this._categories = null;
  }

  ngAfterViewInit(): void {
    this.isDisplayed.emit(true);
  }

  @Input()
  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }

  @Input()
  set categories(categories: Array<CategoryDetailed>) {
    this._categories = categories;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get categories(): Array<CategoryDetailed> {
    return this._categories!;
  }

  get hasContents(): boolean {
    return this._categories !== null;
  }
}
