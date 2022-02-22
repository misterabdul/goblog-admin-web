import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AfterViewInit, Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule, MarkedOptions } from '@misterabdul/ngx-markdown';

import { MarkedConfig } from './configs/marked.config';

import { AppRoutingModule } from './app-routing.module';
import { ComponentModule } from './components/components.module';
import { PageModule } from './pages/pages.module';
import { MsgPackInterceptor, RefreshAuthInterceptor } from './utils/http.util';
import { AuthService, TokenCheckStatus } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `<div>
    <app-component-shared-cloak
      *ngIf="isCloakVisible"
    ></app-component-shared-cloak>
    <router-outlet></router-outlet>
  </div>`,
})
export class AppComponent implements AfterViewInit {
  private _authService: AuthService;
  private _isCloakVisible: boolean;

  constructor(authService: AuthService) {
    this._authService = authService;
    this._isCloakVisible = true;
  }

  ngAfterViewInit(): void {
    this._authService.checkForToken().subscribe((status) => {
      if (status !== TokenCheckStatus.CHECKING)
        setTimeout(() => {
          this._isCloakVisible = false;
        }, 400);
    });
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
