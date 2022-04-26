import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';

import { CommentService } from 'src/app/services/comment.service';
import { CommentDetailed } from 'src/app/types/comment.type';

@Injectable({
  providedIn: 'root',
})
export class CommentShowResolver implements Resolve<CommentDetailed | null> {
  protected _commentService: CommentService;

  constructor(commentService: CommentService) {
    this._commentService = commentService;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<CommentDetailed | null> {
    return this._commentService
      .getComment(route.params['uid'] ?? null)
      .pipe(map((response) => response.data ?? null));
  }
}
