import { environment } from 'src/environments/environment';

export default class URL {
  public static baseUrl = environment.apiUrl;

  public static login = URL.baseUrl + '/api/v1/signin';
  public static logout = URL.baseUrl + '/api/v1/refresh/signout';
  public static refreshToken = URL.baseUrl + '/api/v1/refresh';
}
