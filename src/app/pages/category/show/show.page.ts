import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, throwError } from 'rxjs';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryDetailed } from 'src/app/types/category.type';

@Component({
  selector: 'app-page-category-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class CategoryShowPage implements AfterViewInit {
  protected _activatedRouteService: ActivatedRoute;
  protected _snackBarService: MatSnackBar;
  protected _categoryService: CategoryService;
  protected _categoryId: string | null;
  protected _category: CategoryDetailed | null;

  constructor(
    activatedRouteService: ActivatedRoute,
    snackBarService: MatSnackBar,
    categoryService: CategoryService
  ) {
    this._activatedRouteService = activatedRouteService;
    this._snackBarService = snackBarService;
    this._categoryService = categoryService;

    this._categoryId = null;
    this._category = null;
  }

  ngAfterViewInit(): void {
    this._activatedRouteService.params
      .pipe(
        mergeMap((params) => {
          if (typeof params['id'] === 'string') {
            this._categoryId = params['id'];
            return this._categoryService.getCategory(this._categoryId);
          }
          return throwError(new Error("couldn't find id route parameter"));
        })
      )
      .subscribe({
        next: (response) => {
          this._category = response.data!;
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this._snackBarService.open(
              'Failed to fetch category.\n' +
                (error.error?.message ?? 'Unknown error.'),
              undefined,
              {
                duration: SnackBarConfig.ERROR_DURATIONS,
              }
            );
          } else {
            this._snackBarService.open(
              'Failed to fetch category.\nUnknown error.',
              undefined,
              {
                duration: SnackBarConfig.ERROR_DURATIONS,
              }
            );
          }
        },
      });
  }

  get categoryId(): string {
    return this._categoryId!;
  }

  get category(): CategoryDetailed {
    return this._category!;
  }
}
