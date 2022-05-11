import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageDetailed } from 'src/app/types/page.type';
import { CommonTableComponent } from '../../shared/table/table.component';

@Component({
  selector: 'app-component-page-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class PageTableComponent
  extends CommonTableComponent<PageDetailed>
  implements OnInit
{
  constructor(activatedRouteService: ActivatedRoute) {
    super(activatedRouteService);

    this._displayedColumns = ['no', 'title', 'created-at', 'action'];
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
    } else {
      this._displayedColumns = ['no', 'title', 'created-at', 'action'];
    }
  }
}
