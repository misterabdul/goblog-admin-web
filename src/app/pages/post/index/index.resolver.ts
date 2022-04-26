import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';

import { PostDetailed } from 'src/app/types/post.type';
import { Response } from 'src/app/types/response.type';
import { PostService } from 'src/app/services/post.service';

@Injectable({
  providedIn: 'root',
})
export class IndexTabDraftResolver implements Resolve<PostDetailed[] | null> {
  protected _postService: PostService;

  protected _tabObservable: Observable<Response<PostDetailed[]>>;

  constructor(postService: PostService) {
    this._postService = postService;

    this._tabObservable = this._postService.getDrafts();
  }

  resolve(): Observable<PostDetailed[] | null> {
    return this._tabObservable.pipe(map((response) => response?.data ?? null));
  }
}

@Injectable({
  providedIn: 'root',
})
export class IndexTabPublishedResolver extends IndexTabDraftResolver {
  constructor(postService: PostService) {
    super(postService);

    this._tabObservable = this._postService.getPublished();
  }
}

@Injectable({
  providedIn: 'root',
})
export class IndexTabTrashResolver extends IndexTabDraftResolver {
  constructor(postService: PostService) {
    super(postService);

    this._tabObservable = this._postService.getTrashed();
  }
}
