import { environment } from 'src/environments/environment';

export default class URL {
  public static baseUrl = environment.apiUrl;

  public static login = URL.baseUrl + '/api/v1/signin';
  public static logout = URL.baseUrl + '/api/v1/refresh/signout';
  public static refreshToken = URL.baseUrl + '/api/v1/refresh';

  public static posts = URL.baseUrl + '/api/v1/auth/editor/posts';
  public static post = URL.baseUrl + '/api/v1/auth/editor/post';
  public static submitPost = URL.baseUrl + '/api/v1/auth/writer/post';

  public static categories = URL.baseUrl + '/api/v1/auth/editor/categories';
  public static category = URL.baseUrl + '/api/v1/auth/editor/category';
}
