import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';

import { PageService } from 'src/app/services/page.service';
import { PageDetailed } from 'src/app/types/page.type';
import { Response } from 'src/app/types/response.type';

@Injectable({
  providedIn: 'root',
})
export class PageIndexTabDraftResolver
  implements Resolve<PageDetailed[] | null>
{
  protected _pageService;

  protected _tabObservable: Observable<Response<PageDetailed[]>>;

  constructor(pageService: PageService) {
    this._pageService = pageService;

    this._tabObservable = this._pageService.getDrafts();
  }

  resolve(): Observable<PageDetailed[] | null> {
    return this._tabObservable.pipe(map((response) => response?.data ?? null));
  }
}

@Injectable({
  providedIn: 'root',
})
export class PageIndexTabPublishedResolver extends PageIndexTabDraftResolver {
  constructor(pageService: PageService) {
    super(pageService);

    this._tabObservable = this._pageService.getPublished();
  }
}

@Injectable({
  providedIn: 'root',
})
export class PageIndexTabTrashResolver extends PageIndexTabDraftResolver {
  constructor(pageService: PageService) {
    super(pageService);

    this._tabObservable = this._pageService.getTrashed();
  }
}
