import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { decode } from '@msgpack/msgpack';

export class MsgPackInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (httpRequest.headers.get('Accept') === 'application/msgpack') {
      return this.handleMsgPackRequest(httpRequest, next);
    } else {
      return next.handle(httpRequest);
    }
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
