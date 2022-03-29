import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AfterViewInit, Component, NgModule, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-root',
  template: `<div
    [class]="'root ' + (isDarkMode ? 'dark-mode' : '')"
    *ngIf="isDarkMode !== null"
  >
    <app-component-shared-cloak
      *ngIf="isCloakVisible"
    ></app-component-shared-cloak>
    <router-outlet></router-outlet>
  </div>`,
})
export class AppComponent implements OnInit {
  private _authService: AuthService;
  private _darkModeService: DarkModeService;

  private _isDarkMode: boolean | null;
  private _isCloakVisible: boolean;

  constructor(authService: AuthService, darkModeService: DarkModeService) {
    this._authService = authService;
    this._darkModeService = darkModeService;

    this._isDarkMode = null;
    this._isCloakVisible = true;
  }

  ngOnInit(): void {
    this._darkModeService.darkModeSubject.subscribe({
      next: (isDarkMode) => {
        this._isDarkMode = isDarkMode;
      },
    });
    this._authService.checkForToken().subscribe({
      next: (status) => {
        if (status !== TokenCheckStatus.CHECKING)
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
