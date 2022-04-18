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
import { MarkdownModule, MarkedOptions } from '@misterabdul/ngx-markdown';

import { MarkedConfig } from './configs/marked.config';

import { AuthService, TokenCheckStatus } from './services/auth.service';
import { DarkModeService } from './services/darkmode.service';
import { AppRoutingModule } from './app-routing.module';
import { ComponentModule } from './components/components.module';
import { PageModule } from './pages/pages.module';
import { MsgPackInterceptor, RefreshAuthInterceptor } from './utils/http.util';
import { concatMap, of } from 'rxjs';
import { MeService } from './services/me.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarConfig } from './configs/snackbar.config';

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
  private _snackBarService: MatSnackBar;
  private _authService: AuthService;
  private _meService: MeService;
  private _darkModeService: DarkModeService;

  private _isDarkMode: boolean | null;
  private _isCloakVisible: boolean;
  private _body: HTMLElement;

  constructor(
    snackBarService: MatSnackBar,
    authService: AuthService,
    meService: MeService,
    darkModeService: DarkModeService
  ) {
    this._snackBarService = snackBarService;
    this._authService = authService;
    this._meService = meService;
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
    this._authService
      .getTokenCheckStatus()
      .pipe(
        concatMap((result) => {
          if (
            result.status === TokenCheckStatus.CHECK &&
            result.authResponse?.data !== undefined
          ) {
            const _authToken =
              result.authResponse?.data?.tokenType +
              ' ' +
              result.authResponse?.data?.accessToken!;
            return this._meService.fetchMe(_authToken).pipe(
              concatMap((meResponse) => {
                return of(result);
              })
            );
          }
          return of(result);
        })
      )
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this._isCloakVisible = false;
          }, 400);
        },
        error: (error) => {
          if (!(error instanceof HttpErrorResponse && error.status === 401)) {
            this._snackBarService.open(
              error.error?.message ?? 'Unknown error.',
              undefined,
              {
                duration: SnackBarConfig.ERROR_DURATIONS,
              }
            );
          }
          setTimeout(() => {
            this._isCloakVisible = false;
          }, 400);
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
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
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
