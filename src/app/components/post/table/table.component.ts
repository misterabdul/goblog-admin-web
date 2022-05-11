import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostDetailed } from 'src/app/types/post.type';
import { CommonTableComponent } from '../../shared/table/table.component';

@Component({
  selector: 'app-component-post-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class PostTableComponent
  extends CommonTableComponent<PostDetailed>
  implements OnInit
{
  constructor(activatedRouteService: ActivatedRoute) {
    super(activatedRouteService);

    this._displayedColumns = [
      'no',
      'title',
      'category',
      'created-at',
      'action',
    ];
  }

  @Input()
  set showPublished(showPublished: boolean) {
    if (showPublished) {
      this._displayedColumns = [
        'no',
        'title',
        'category',
        'created-at',
        'published-at',
        'action',
      ];
    } else {
      this._displayedColumns = [
        'no',
        'title',
        'category',
        'created-at',
        'action',
      ];
    }
  }
}
