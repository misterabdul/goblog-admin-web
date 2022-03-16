import { Component, Input } from '@angular/core';

import { CategoryDetailed } from 'src/app/types/category.type';

@Component({
  selector: 'app-component-category-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class CategoryViewerComponent {
  protected _category: CategoryDetailed | null;

  constructor() {
    this._category = null;
  }

  @Input()
  set category(category: CategoryDetailed | null) {
    this._category = category;
  }

  get category(): CategoryDetailed {
    return this._category!;
  }
}
