import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
  catchError,
  filter,
  finalize,
  mergeMap,
  switchMap,
  take,
} from 'rxjs/operators';
import { decode } from '@msgpack/msgpack';

import { HttpConfig } from '../configs/http.config';

import { AuthService } from '../services/auth.service';

@Injectable()
export class MsgPackInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (httpRequest.headers.get('Accept') === 'application/msgpack')
      return this.handleMsgPackRequest(httpRequest, next);
    return next.handle(httpRequest);
  }

  protected handleMsgPackRequest(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    httpRequest = httpRequest.clone({ responseType: 'blob' });
    return next.handle(httpRequest).pipe(
      catchError(async (errorResponse: HttpErrorResponse) => {
        if (errorResponse.error instanceof Blob) {
          const arrayBuffer = await errorResponse.error.arrayBuffer();
          throw new HttpErrorResponse({
            error: decode(arrayBuffer),
            headers: errorResponse.headers,
            status: errorResponse.status,
            statusText: errorResponse.statusText,
            url: errorResponse.url ?? undefined,
          });
        }
        throw errorResponse;
      }),
      mergeMap(
        async (event: HttpEvent<any>) => await this.parseMsgPackResponse(event)
      )
    );
  }

  protected async parseMsgPackResponse(
    event: HttpEvent<any>
  ): Promise<HttpEvent<any>> {
    if (event instanceof HttpResponse && event.body instanceof Blob) {
      const arrayBuffer = await event.body.arrayBuffer();
      return event.clone({ body: decode(arrayBuffer) });
    }
    return event;
  }
}

@Injectable()
export class RefreshAuthInterceptor implements HttpInterceptor {
  private _refreshTokenSubject: BehaviorSubject<Boolean>;
  private _isRefreshing: boolean;
  private _authService: AuthService;

  constructor(authService: AuthService) {
    this._refreshTokenSubject = new BehaviorSubject<Boolean>(false);
    this._isRefreshing = false;

    this._authService = authService;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.headers.has('Authorization'))
      return this.handleAuthorizedRequest(request, next);
    return next.handle(request);
  }

  private handleAuthorizedRequest(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401)
          return this.handleTokenExpiredError(request, next);
        return throwError(error);
      })
    );
  }

  private handleTokenExpiredError(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this._isRefreshing) {
      this._isRefreshing = true;
      this._refreshTokenSubject.next(false);

      return this._authService.refreshToken().pipe(
        switchMap(() => {
          this._refreshTokenSubject.next(true);
          return next.handle(this.newRequest(request));
        }),
        catchError((error) => {
          this._authService.deauthenticate();
          return throwError(error);
        }),
        finalize(() => {
          this._isRefreshing = false;
        })
      );
    }

    return this._refreshTokenSubject.pipe(
      filter((isRefreshed) => isRefreshed !== false),
      take(1),
      switchMap(() => {
        return next.handle(this.newRequest(request));
      })
    );
  }

  private newRequest(request: HttpRequest<any>): HttpRequest<any> {
    const token =
      this._authService.tokenType + ' ' + this._authService.accessToken;

    return request.clone(HttpConfig.getDefaultAuthenticatedOptions(token));
  }
}
