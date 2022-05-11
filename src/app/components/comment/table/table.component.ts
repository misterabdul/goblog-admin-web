import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommentDetailed } from 'src/app/types/comment.type';
import { CommonTableComponent } from '../../shared/table/table.component';

@Component({
  selector: 'app-component-comment-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class CommentTableComponent
  extends CommonTableComponent<CommentDetailed>
  implements OnInit
{
  constructor(activatedRouteService: ActivatedRoute) {
    super(activatedRouteService);

    this._displayedColumns = [
      'no',
      'name',
      'email',
      'content',
      'created-at',
      'action',
    ];
  }
}
