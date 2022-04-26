import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';

import { PageService } from 'src/app/services/page.service';
import { PageDetailed } from 'src/app/types/page.type';

@Injectable({
  providedIn: 'root',
})
export class PageShowResolver implements Resolve<PageDetailed | null> {
  protected _pageService: PageService;

  constructor(pageService: PageService) {
    this._pageService = pageService;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<PageDetailed | null> {
    return this._pageService
      .getPage(route.params['uid'] ?? null)
      .pipe(map((response) => response.data ?? null));
  }
}
