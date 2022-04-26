import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CategoryDetailed } from 'src/app/types/category.type';

@Component({
  selector: 'app-component-category-tab-active',
  templateUrl: './tab-active.component.html',
  styleUrls: ['./tab-active.component.scss'],
})
export class CategoryTabActiveComponent implements OnInit {
  private _activatedRouteService: ActivatedRoute;

  private _categories: Array<CategoryDetailed> | null;

  constructor(activatedRouteService: ActivatedRoute) {
    this._activatedRouteService = activatedRouteService;

    this._categories = null;
  }

  ngOnInit(): void {
    this._categories =
      this._activatedRouteService.snapshot.data.categories ?? null;
  }

  get categories(): Array<CategoryDetailed> | null {
    return this._categories;
  }
}
