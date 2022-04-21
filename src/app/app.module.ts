import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MarkdownModule, MarkedOptions } from '@misterabdul/ngx-markdown';
import { catchError, of, take } from 'rxjs';

import { MarkedConfig } from './configs/marked.config';
import { SnackBarConfig } from './configs/snackbar.config';

import { AuthService } from './services/auth.service';
import { DarkModeService } from './services/darkmode.service';
import { AppRoutingModule } from './app-routing.module';
import { ComponentModule } from './components/components.module';
import { PageModule } from './pages/pages.module';
import { MsgPackInterceptor, RefreshAuthInterceptor } from './utils/http.util';

@Component({
  selector: 'app-root',
  template: `<div *ngIf="isDarkMode !== null">
    <app-component-shared-cloak
      *ngIf="isCloakVisible"
    ></app-component-shared-cloak>
    <router-outlet></router-outlet>
  </div>`,
})
export class AppComponent implements OnInit {
  private _routerService: Router;
  private _snackBarService: MatSnackBar;
  private _authService: AuthService;
  private _darkModeService: DarkModeService;

  private _isDarkMode: boolean | null;
  private _isCloakVisible: boolean;
  private _body: HTMLElement;

  constructor(
    routerService: Router,
    snackBarService: MatSnackBar,
    authService: AuthService,
    darkModeService: DarkModeService
  ) {
    this._routerService = routerService;
    this._snackBarService = snackBarService;
    this._authService = authService;
    this._darkModeService = darkModeService;

    this._isDarkMode = null;
    this._isCloakVisible = true;
    this._body = document.body;
  }

  ngOnInit(): void {
    this._darkModeService.darkModeSubject.subscribe({
      next: (isDarkMode) => {
        if (isDarkMode) {
          this._body.classList.add('dark-mode');
        } else {
          this._body.classList.remove('dark-mode');
        }
        this._isDarkMode = isDarkMode;
      },
    });

    const tokenCheckSubscription = this._authService
      .getTokenCheckStatus()
      .pipe(
        take(1),
        catchError((error) => {
          if (!(error instanceof HttpErrorResponse && error.status === 401)) {
            this._snackBarService.open(
              error.error?.message ?? 'Unknown error.',
              undefined,
              {
                duration: SnackBarConfig.ERROR_DURATIONS,
              }
            );
          }

          return of(null);
        })
      )
      .subscribe({
        complete: () => {
          setTimeout(() => {
            this._isCloakVisible = false;
          }, 400);
          this._routerService.initialNavigation();
          tokenCheckSubscription.unsubscribe();
        },
      });
  }

  get isDarkMode(): boolean | null {
    return this._isDarkMode;
  }

  get isCloakVisible(): boolean {
    return this._isCloakVisible;
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: MarkedConfig.optionsFactory,
      },
    }),
    AppRoutingModule,
    ComponentModule,
    PageModule,
  ],
  providers: [
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: MsgPackInterceptor,
        multi: true,
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: RefreshAuthInterceptor,
        multi: true,
      },
    ],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
