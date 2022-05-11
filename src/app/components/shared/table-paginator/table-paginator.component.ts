import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

import { ResourceStats } from 'src/app/types/resource-stats.type';

@Component({
  selector: 'app-component-shared-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.scss'],
})
export class SharedTablePaginatorComponent implements OnInit {
  private _activatedRouteService: ActivatedRoute;
  private _routerService: Router;

  private _stats: ResourceStats | null;

  constructor(activatedRouteService: ActivatedRoute, routerService: Router) {
    this._activatedRouteService = activatedRouteService;
    this._routerService = routerService;

    this._stats = null;
  }

  ngOnInit(): void {
    this._stats = this._activatedRouteService.snapshot.data.stats;
  }

  public page(pageEvent: PageEvent) {
    if (this._stats?.currentPage)
      this._stats.currentPage = pageEvent.pageIndex + 1;
    if (this._stats?.totalItems) this._stats.totalItems = pageEvent.length;
    if (this._stats?.itemsPerPage)
      this._stats.itemsPerPage = pageEvent.pageSize;

    this._routerService.navigateByUrl(
      this._routerService.url.split('?')[0] +
        '?show=' +
        pageEvent.pageSize +
        '&page=' +
        (pageEvent.pageIndex + 1),
      {
        replaceUrl: true,
      }
    );
  }

  get stats(): ResourceStats | null {
    return this._stats;
  }

  get pageIndex(): number | null {
    if (this._stats?.currentPage) return this._stats.currentPage - 1;
    return null;
  }
}
