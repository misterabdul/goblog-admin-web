import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { CategoryFormData } from 'src/app/types/category.type';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-page-category-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CategoryCreatePage {
  private _routerService: Router;
  private _snackBarService: MatSnackBar;
  private _categoryService: CategoryService;
  private _submitting: boolean;

  constructor(
    routerService: Router,
    snackBarService: MatSnackBar,
    categoryService: CategoryService
  ) {
    this._routerService = routerService;
    this._snackBarService = snackBarService;
    this._categoryService = categoryService;

    this._submitting = false;
  }

  public create(category: CategoryFormData | undefined) {
    if (!this._submitting && category) {
      this._submitting = true;
      this._categoryService.submitNewCategory(category).subscribe(
        () => {
          this._snackBarService.open('Category created.', undefined, {
            duration: SnackBarConfig.SUCCESS_DURATIONS,
          });
          setTimeout(() => {
            this._routerService.navigate(['/category']);
          }, 100);
        },
        (error) => {
          this._submitting = false;
          if (error instanceof HttpErrorResponse) {
            this._snackBarService.open(
              error.error?.message ?? 'Unknown error.',
              undefined,
              {
                duration: SnackBarConfig.ERROR_DURATIONS,
              }
            );
          } else {
            this._snackBarService.open('Unknown error.', undefined, {
              duration: SnackBarConfig.ERROR_DURATIONS,
            });
          }
        }
      );
    }
  }

  get submitting(): boolean {
    return this._submitting;
  }
}
