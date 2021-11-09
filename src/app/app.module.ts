import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule, MarkedOptions } from '@misterabdul/ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { markedOptionsFactory } from './configs/marked.config';
import { ComponentModule } from './components/components.module';
import { PageModule } from './pages/pages.module';
import { MsgPackInterceptor } from './utils/http.util';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `<div>
    <app-component-shared-cloak
      *ngIf="isCloakVisible"
    ></app-component-shared-cloak>
    <router-outlet></router-outlet>
  </div>`,
})
class AppComponent {
  private _isCloakVisible: boolean;

  constructor(authService: AuthService) {
    this._isCloakVisible = true;

    authService.checkForToken().finally(() => {
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
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    }),
    AppRoutingModule,
    ComponentModule,
    PageModule,
  ],
  providers: [
    [{ provide: HTTP_INTERCEPTORS, useClass: MsgPackInterceptor, multi: true }],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
