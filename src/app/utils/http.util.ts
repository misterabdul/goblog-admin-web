import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import {
  catchError,
  filter,
  finalize,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { decode } from '@msgpack/msgpack';

import { HttpConfig } from '../configs/http.config';

import { AuthenticationToken, AuthService } from '../services/auth.service';

@Injectable()
export class MsgPackInterceptor implements HttpInterceptor {
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
  private _authService: AuthService;

  private _isRefreshing: boolean;
  private _refreshTokenSubject: Subject<AuthenticationToken | false>;

  constructor(authService: AuthService) {
    this._authService = authService;

    this._isRefreshing = false;
    this._refreshTokenSubject = new BehaviorSubject<
      AuthenticationToken | false
    >(false);
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
        return throwError(() => error);
      })
    );
  }

  private handleTokenExpiredError(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const refreshTokenObservable = this._refreshTokenSubject.pipe(
      filter((authToken) => authToken !== false),
      switchMap((authToken) => next.handle(this.newRequest(authToken, request)))
    );

    if (!this._isRefreshing) {
      this._isRefreshing = true;
      return this._authService.getAuthToken(true).pipe(
        filter((authToken) => authToken !== false),
        map((authToken) => (authToken === null ? false : authToken)),
        switchMap((authToken) => {
          if (authToken === false)
            throwError(() => new Error('Unauthenticated'));
          this._refreshTokenSubject.next(authToken);
          return refreshTokenObservable;
        }),
        catchError((error) => {
          this._authService.deauthenticate();
          return throwError(() => error);
        }),
        finalize(() => {
          this._isRefreshing = false;
        })
      );
    }

    return refreshTokenObservable;
  }

  private newRequest(
    authToken: AuthenticationToken | false,
    request: HttpRequest<any>
  ): HttpRequest<any> {
    const token = authToken === false ? '' : authToken.toString();
    return request.clone(
      HttpConfig.getDefaultAuthenticatedOptions(token) as {}
    );
  }
}
