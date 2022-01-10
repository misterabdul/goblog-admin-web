import { environment } from 'src/environments/environment';

export class UrlConfig {
  public static baseUrl = environment.apiUrl;

  public static login = UrlConfig.baseUrl + '/api/v1/signin';
  public static logout = UrlConfig.baseUrl + '/api/v1/refresh/signout';
  public static refreshToken = UrlConfig.baseUrl + '/api/v1/refresh';

  public static posts = UrlConfig.baseUrl + '/api/v1/auth/editor/posts';
  public static post = UrlConfig.baseUrl + '/api/v1/auth/editor/post';
  public static submitPost = UrlConfig.baseUrl + '/api/v1/auth/writer/post';

  public static categories = UrlConfig.baseUrl + '/api/v1/auth/editor/categories';
  public static category = UrlConfig.baseUrl + '/api/v1/auth/editor/category';
}
