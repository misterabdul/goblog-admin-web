import { HttpHeaders } from '@angular/common/http';

export default class HttpConfig {
  public static getDefaultOptions(headers: HttpHeaders | null = null) {
    let _headers = headers ?? new HttpHeaders();
    _headers = _headers.append('Accept', 'application/msgpack');

    return {
      headers: _headers,
    };
  }
}
