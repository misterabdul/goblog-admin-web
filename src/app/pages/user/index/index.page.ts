import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';
import { UserDetailed } from 'src/app/types/user.type';

@Component({
  selector: 'app-page-user-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class UserIndexPage implements OnInit {
  private _active: Array<UserDetailed> | null;
  private _isLoadingActive: boolean;
  private _trash: Array<UserDetailed> | null;
  private _isLoadingTrash: boolean;
  private _selectedTabIndex: number;

  private _routerService: Router;
  private _activatedRouteService: ActivatedRoute;
  private _userService: UserService;

  constructor(
    routerService: Router,
    activatedRouteService: ActivatedRoute,
    userService: UserService
  ) {
    this._active = null;
    this._isLoadingActive = true;
    this._trash = null;
    this._isLoadingTrash = true;
    this._selectedTabIndex = 0;

    this._routerService = routerService;
    this._activatedRouteService = activatedRouteService;
    this._userService = userService;
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
      this._userService
        .getUsers()
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
      this._userService
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

  get active(): Array<UserDetailed> {
    return this._active!;
  }

  get isLoadingActive(): boolean {
    return this._isLoadingActive;
  }

  get trash(): Array<UserDetailed> {
    return this._trash!;
  }

  get isLoadingTrash(): boolean {
    return this._isLoadingTrash;
  }

  get selectedTabIndex(): number {
    return this._selectedTabIndex;
  }
}
