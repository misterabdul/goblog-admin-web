import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';

import { CategoryService } from 'src/app/services/category.service';
import { CategoryDetailed } from 'src/app/types/category.type';

@Injectable({
  providedIn: 'root',
})
export class CategoryShowResolver implements Resolve<CategoryDetailed | null> {
  protected _categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this._categoryService = categoryService;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<CategoryDetailed | null> {
    return this._categoryService
      .getCategory(route.params['uid'] ?? null)
      .pipe(map((response) => response.data ?? null));
  }
}
