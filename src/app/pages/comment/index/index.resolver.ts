import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';

import { CommentService } from 'src/app/services/comment.service';
import { CommentDetailed } from 'src/app/types/comment.type';
import { Response } from 'src/app/types/response.type';

@Injectable({
  providedIn: 'root',
})
export class CommentIndexTabCommentResolver
  implements Resolve<CommentDetailed[] | null>
{
  protected _commentService: CommentService;

  protected _tabObservable: Observable<Response<CommentDetailed[] | null>>;

  constructor(commentService: CommentService) {
    this._commentService = commentService;

    this._tabObservable = this._commentService.getComments();
  }

  resolve(): Observable<CommentDetailed[] | null> {
    return this._tabObservable.pipe(map((response) => response?.data ?? null));
  }
}

@Injectable({
  providedIn: 'root',
})
export class CommentIndexTabTrashResolver extends CommentIndexTabCommentResolver {
  constructor(commentService: CommentService) {
    super(commentService);

    this._tabObservable = this._commentService.getTrashed();
  }
}
