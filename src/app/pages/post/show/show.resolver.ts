import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';

import { PostService } from 'src/app/services/post.service';
import { PostDetailed } from 'src/app/types/post.type';

@Injectable({
  providedIn: 'root',
})
export class PostShowResolver implements Resolve<PostDetailed | null> {
  protected _postService: PostService;

  constructor(postService: PostService) {
    this._postService = postService;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<PostDetailed | null> {
    return this._postService
      .getPost(route.params['uid'] ?? '')
      .pipe(map((response) => response.data ?? null));
  }
}
