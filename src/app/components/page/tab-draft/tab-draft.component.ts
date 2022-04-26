import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDetailed } from 'src/app/types/page.type';

@Component({
  selector: 'app-component-page-tab-draft',
  templateUrl: './tab-draft.component.html',
  styleUrls: ['./tab-draft.component.scss'],
})
export class PageTabDraftComponent implements OnInit {
  private _activatedRouteService: ActivatedRoute;

  private _pages: Array<PageDetailed> | null;

  constructor(activatedRouteService: ActivatedRoute) {
    this._activatedRouteService = activatedRouteService;

    this._pages = null;
  }

  ngOnInit(): void {
    this._pages = this._activatedRouteService.snapshot.data.pages ?? null;
  }

  get pages(): Array<PageDetailed> {
    return this._pages!;
  }
}
