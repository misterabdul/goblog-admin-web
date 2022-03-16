import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { SnackBarConfig } from 'src/app/configs/snackbar.config';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryFormData } from 'src/app/types/category.type';
import { CategoryShowPage } from '../show/show.page';

@Component({
  selector: 'app-page-category-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class CategoryUpdatePage extends CategoryShowPage {
  private _routerService: Router;
  private _updating: boolean;

  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    snackBarService: MatSnackBar,
    categoryService: CategoryService
  ) {
    super(activatedRouteService, snackBarService, categoryService);
    this._routerService = routerService;

    this._updating = false;
  }

  public update(category: CategoryFormData | undefined) {
    if (!this._updating && category) {
      this._updating = true;
      this._categoryService
        .submitUpdateCategory(this.categoryId, category)
        .subscribe({
          next: (response) => {
            this._snackBarService.open('Category updated.', undefined, {
              duration: SnackBarConfig.SUCCESS_DURATIONS,
            });
            setTimeout(() => {
              this._routerService.navigate(['/category']);
            }, 100);
          },
          error: (error) => {
            this._updating = false;
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
          },
        });
    }
  }

  get updating(): boolean {
    return this._updating;
  }
}
