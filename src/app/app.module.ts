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
import { PageModule } from './pages/pages.module';
import { MsgPackInterceptor } from './utils/http.util';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
class AppComponent {}

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
    PageModule,
  ],
  providers: [
    [{ provide: HTTP_INTERCEPTORS, useClass: MsgPackInterceptor, multi: true }],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
