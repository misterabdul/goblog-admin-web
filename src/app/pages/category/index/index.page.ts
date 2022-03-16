import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { CategoryDetailed } from 'src/app/types/category.type';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-page-category-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class CategoryIndexPage implements OnInit {
  private _active: Array<CategoryDetailed> | null;
  private _isLoadingActive: boolean;
  private _trash: Array<CategoryDetailed> | null;
  private _isLoadingTrash: boolean;
  private _selectedTabIndex: number;

  private _routerService: Router;
  private _activatedRouteService: ActivatedRoute;
  private _categoryService: CategoryService;

  constructor(
    routerService: Router,
    activatedRouteService: ActivatedRoute,
    categoryService: CategoryService
  ) {
    this._active = null;
    this._isLoadingActive = true;
    this._trash = null;
    this._isLoadingTrash = true;
    this._selectedTabIndex = 0;

    this._routerService = routerService;
    this._activatedRouteService = activatedRouteService;
    this._categoryService = categoryService;
  }

  ngOnInit(): void {
    this._activatedRouteService.queryParams.subscribe({
      next: (params) => {
        const tab = params?.tab ?? null;
        switch (true) {
          default:
            break;
          case tab === 'trash':
            this._selectedTabIndex = 1;
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

  public loadActive(isActiveTabDisplayed: boolean) {
    this.changeRouteQuery('active');
    if (this._active === null && isActiveTabDisplayed) {
      this._isLoadingActive = true;
      this._categoryService
        .getCategories()
        .pipe(
          finalize(() => {
            this._isLoadingActive = false;
          })
        )
        .subscribe({
          next: (response) => {
            this._active = response?.data ?? null;
          },
          error: (error) => {},
        });
    }
  }

  public loadTrash(isTrashTabDisplayed: boolean) {
    this.changeRouteQuery('trash');
    if (this._trash === null && isTrashTabDisplayed) {
      this._isLoadingTrash = true;
      this._categoryService
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
          error: (error) => {},
        });
    }
  }

  get active(): Array<CategoryDetailed> {
    return this._active!;
  }

  get isLoadingActive(): boolean {
    return this._isLoadingActive;
  }

  get trash(): Array<CategoryDetailed> {
    return this._trash!;
  }

  get isLoadingTrash(): boolean {
    return this._isLoadingTrash;
  }

  get selectedTabIndex(): number {
    return this._selectedTabIndex;
  }
}
