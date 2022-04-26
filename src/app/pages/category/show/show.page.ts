import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from 'src/app/services/category.service';
import { CategoryDetailed } from 'src/app/types/category.type';

@Component({
  selector: 'app-page-category-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class CategoryShowPage implements OnInit {
  protected _activatedRouteService: ActivatedRoute;

  protected _category: CategoryDetailed | null;

  constructor(activatedRouteService: ActivatedRoute) {
    this._activatedRouteService = activatedRouteService;

    this._category = null;
  }

  ngOnInit(): void {
    this._category = this._activatedRouteService.snapshot.data.category;
  }

  get category(): CategoryDetailed | null {
    return this._category;
  }
}

export abstract class CommonCategoryModifierPage extends CategoryShowPage {
  protected _routerService: Router;
  protected _matDialogService: MatDialog;
  protected _snackBarService: MatSnackBar;
  protected _categoryService: CategoryService;

  protected _submitting: boolean;

  constructor(
    activatedRouteService: ActivatedRoute,
    routerService: Router,
    matDialogService: MatDialog,
    snackBarService: MatSnackBar,
    categoryService: CategoryService
  ) {
    super(activatedRouteService);
    this._routerService = routerService;
    this._matDialogService = matDialogService;
    this._snackBarService = snackBarService;
    this._categoryService = categoryService;

    this._submitting = false as boolean;
  }

  get submitting(): boolean {
    return this._submitting;
  }
}
