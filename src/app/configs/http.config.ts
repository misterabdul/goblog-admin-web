import { HttpHeaders } from '@angular/common/http';

export default class HttpConfig {
  public static getDefaultOptions(extraHeaders: HttpHeaders | null = null) {
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
