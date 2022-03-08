import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

type HttpOptions = {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
};
export class HttpConfig {
  public static getDefaultOptions(
    extraHeaders: HttpHeaders | null = null
  ): HttpOptions {
    let _headers = extraHeaders ?? new HttpHeaders();
    _headers = _headers.append('Accept', 'application/msgpack');

    return {
      headers: _headers,
    };
  }

  public static getDefaultAuthenticatedOptions(
    authorizationToken: string,
    extraHeaders: HttpHeaders | null = null
  ) {
    let _headers = extraHeaders ?? new HttpHeaders();
    _headers = _headers.append('Authorization', authorizationToken);

    return HttpConfig.getDefaultOptions(_headers);
  }
}
