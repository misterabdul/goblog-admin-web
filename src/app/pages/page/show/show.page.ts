import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';

import { PageService } from 'src/app/services/page.service';
import { PageDetailed } from 'src/app/types/page.type';

@Component({
  selector: 'app-page-page-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class PageShowPage implements AfterViewInit {
  protected _activatedRouteService: ActivatedRoute;
  protected _snackBarService: MatSnackBar;
  protected _pageService: PageService;
  protected _pageUid: string | null;
  protected _page: PageDetailed | null;

  constructor(
    activatedRouteService: ActivatedRoute,
    snackBarService: MatSnackBar,
    pageService: PageService
  ) {
    this._activatedRouteService = activatedRouteService;
    this._snackBarService = snackBarService;
    this._pageService = pageService;

    this._pageUid = null;
    this._page = null;
  }

  public ngAfterViewInit(): void {
    this._activatedRouteService.params
      .pipe(
        mergeMap((params) => {
          if (typeof params['uid'] === 'string') this._pageUid = params['uid'];
          else this._pageUid = null;

          return this._pageService.getPage(this._pageUid!);
        })
      )
      .subscribe({
        next: (response) => {
          this._page = response.data ?? null;
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this._snackBarService.open(
              'Failed to fetch page.\n' +
                (error.error?.message ?? 'Unknown error.'),
              undefined,
              {
                duration: SnackBarConfig.ERROR_DURATIONS,
              }
            );
          } else {
            this._snackBarService.open(
              'Failed to fetch page.\nUnknown error.',
              undefined,
              {
                duration: SnackBarConfig.ERROR_DURATIONS,
              }
            );
          }
        },
      });
  }

  get pageUid(): string | null {
    return this._pageUid;
  }

  get page(): PageDetailed | null {
    return this._page;
  }
}
