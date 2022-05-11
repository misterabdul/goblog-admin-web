import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CategoryDetailed } from 'src/app/types/category.type';
import { CommonTableComponent } from '../../shared/table/table.component';

@Component({
  selector: 'app-component-category-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class CategoryTableComponent
  extends CommonTableComponent<CategoryDetailed>
  implements OnInit
{
  constructor(activatedRouteService: ActivatedRoute) {
    super(activatedRouteService);

    this._displayedColumns = ['no', 'slug', 'name', 'created-at', 'action'];
  }
}
