import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { PageService } from 'src/app/services/page.service';
import { PageDetailed } from 'src/app/types/page.type';

@Component({
  selector: 'app-page-page-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class PageIndexPage implements OnInit {
  private _pageService: PageService;
  private _routerService: Router;
  private _activatedRouteService: ActivatedRoute;

  private _draft: Array<PageDetailed> | null;
  private _isLoadingDraft: boolean;
  private _published: Array<PageDetailed> | null;
  private _isLoadingPublished: boolean;
  private _trash: Array<PageDetailed> | null;
  private _isLoadingTrash: boolean;
  private _selectedTabIndex: number;

  constructor(
    pageService: PageService,
    routerService: Router,
    activatedRouteService: ActivatedRoute
  ) {
    this._pageService = pageService;
    this._routerService = routerService;
    this._activatedRouteService = activatedRouteService;

    this._draft = null;
    this._isLoadingDraft = true;
    this._published = null;
    this._isLoadingPublished = true;
    this._trash = null;
    this._isLoadingTrash = true;
    this._selectedTabIndex = 0;
  }

  ngOnInit(): void {
    this._activatedRouteService.queryParams.subscribe({
      next: (params) => {
        const tab = params?.tab ?? null;
        switch (true) {
          default:
            break;
          case tab === 'published':
            this._selectedTabIndex = 1;
            break;
          case tab === 'trash':
            this._selectedTabIndex = 2;
            break;
        }
      },
    });
  }

  private async changeRouteQuery(tabQuery: string): Promise<void> {
    await this._routerService.navigate([], {
      relativeTo: this._activatedRouteService,
      queryParams: {
        tab: tabQuery,
      },
      queryParamsHandling: 'merge',
    });
  }

  public loadDraft(isDraftTabDisplayed: boolean) {
    this.changeRouteQuery('draft');
    if (this._draft === null && isDraftTabDisplayed) {
      this._isLoadingDraft = true;
      this._pageService
        .getDrafts()
        .pipe(
          finalize(() => {
            this._isLoadingDraft = false;
          })
        )
        .subscribe({
          next: (response) => {
            this._draft = response?.data ?? null;
          },
        });
    }
  }

  public loadPublished(isPublishedTabDisplayed: boolean) {
    this.changeRouteQuery('published');
    if (this._published === null && isPublishedTabDisplayed) {
      this._isLoadingPublished = true;
      this._pageService
        .getPublished()
        .pipe(
          finalize(() => {
            this._isLoadingPublished = false;
          })
        )
        .subscribe({
          next: (response) => {
            this._published = response?.data ?? null;
          },
        });
    }
  }

  public loadTrash(isTrashTabDisplayed: boolean) {
    this.changeRouteQuery('trash');
    if (this._trash === null && isTrashTabDisplayed) {
      this._isLoadingTrash = true;
      this._pageService
        .getTrashed()
        .pipe(
          finalize(() => {
            this._isLoadingTrash = false;
          })
        )
        .subscribe({
          next: (response) => {
            this._trash = response?.data ?? null;
          },
        });
    }
  }

  get draft(): Array<PageDetailed> {
    return this._draft!;
  }

  get isLoadingDraft(): boolean {
    return this._isLoadingDraft;
  }

  get published(): Array<PageDetailed> {
    return this._published!;
  }

  get isLoadingPublished(): boolean {
    return this._isLoadingPublished;
  }

  get trash(): Array<PageDetailed> {
    return this._trash!;
  }

  get isLoadingTrash(): boolean {
    return this._isLoadingTrash;
  }

  get selectedTabIndex(): number {
    return this._selectedTabIndex;
  }
}
