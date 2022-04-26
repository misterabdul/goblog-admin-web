import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';

import { CategoryService } from 'src/app/services/category.service';
import { CategoryDetailed } from 'src/app/types/category.type';
import { Response } from 'src/app/types/response.type';

@Injectable({
  providedIn: 'root',
})
export class CategoryIndexTabCategoryResolver
  implements Resolve<CategoryDetailed[] | null>
{
  protected _categoryService: CategoryService;

  protected _tabObservable: Observable<Response<CategoryDetailed[] | null>>;

  constructor(categoryService: CategoryService) {
    this._categoryService = categoryService;

    this._tabObservable = this._categoryService.getCategories();
  }

  resolve(): Observable<CategoryDetailed[] | null> {
    return this._tabObservable.pipe(map((response) => response?.data ?? null));
  }
}

@Injectable({
  providedIn: 'root',
})
export class CategoryIndexTabTrashResolver extends CategoryIndexTabCategoryResolver {
  constructor(categoryService: CategoryService) {
    super(categoryService);

    this._tabObservable = this._categoryService.getTrashed();
  }
}
