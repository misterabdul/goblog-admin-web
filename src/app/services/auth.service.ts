import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import HttpConfig from '../configs/http.config';
import URL from '../configs/url.config';
import AuthResponse from '../types/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http: HttpClient;
  private _accessToken: string | null;
  private _tokenType: string | null;

  constructor(http: HttpClient) {
    this._http = http;
    this._accessToken = null;
    this._tokenType = null;
  }

  public async authenticate(
    username: string,
    password: string
  ): Promise<AuthResponse> {
    const authResult = await this._http
      .post<AuthResponse>(
        URL.login,
        { username: username, password: password },
        HttpConfig.getDefaultOptions()
      )
      .toPromise();
    this._accessToken = authResult.accessToken!;
    this._tokenType = authResult.tokenType!;
    return authResult;
  }

  public async refreshToken(): Promise<AuthResponse> {
    const refreshTokenResult = await this._http
      .post<AuthResponse>(
        URL.refreshToken,
        null,
        HttpConfig.getDefaultOptions()
      )
      .toPromise();
    this._accessToken = refreshTokenResult.accessToken!;
    this._tokenType = refreshTokenResult.tokenType!;
    return refreshTokenResult;
  }

  get accessToken(): string | null {
    return this._accessToken;
  }

  get tokenType(): string | null {
    return this._tokenType;
  }

  get isAuthenticated(): boolean {
    return this._accessToken !== null && this._tokenType !== null;
  }
}
