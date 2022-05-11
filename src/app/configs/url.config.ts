import { environment } from 'src/environments/environment';

export class UrlConfig {
  public static baseUrl = environment.apiUrl;

  public static login = UrlConfig.baseUrl + '/api/v1/signin';
  public static logout = UrlConfig.baseUrl + '/api/v1/refresh/signout';
  public static refreshToken = UrlConfig.baseUrl + '/api/v1/refresh';

  public static me = UrlConfig.baseUrl + '/api/v1/auth/me';

  public static categories =
    UrlConfig.baseUrl + '/api/v1/auth/editor/categories';
  public static categoriesStats =
    UrlConfig.baseUrl + '/api/v1/auth/editor/categories/stats';
  public static category = UrlConfig.baseUrl + '/api/v1/auth/editor/category';

  public static posts = UrlConfig.baseUrl + '/api/v1/auth/editor/posts';
  public static postsStats =
    UrlConfig.baseUrl + '/api/v1/auth/editor/posts/stats';
  public static post = UrlConfig.baseUrl + '/api/v1/auth/editor/post';
  public static submitPost = UrlConfig.baseUrl + '/api/v1/auth/editor/post';

  public static comments = UrlConfig.baseUrl + '/api/v1/auth/editor/comments';
  public static commentsStats =
    UrlConfig.baseUrl + '/api/v1/auth/editor/comments/stats';
  public static comment = UrlConfig.baseUrl + '/api/v1/auth/editor/comment';

  public static pages = UrlConfig.baseUrl + '/api/v1/auth/editor/pages';
  public static pagesStats =
    UrlConfig.baseUrl + '/api/v1/auth/editor/pages/stats';
  public static page = UrlConfig.baseUrl + '/api/v1/auth/editor/page';
  public static submitPage = UrlConfig.baseUrl + '/api/v1/auth/editor/page';

  public static users = UrlConfig.baseUrl + '/api/v1/auth/admin/users';
  public static usersStats = UrlConfig.baseUrl + '/api/v1/auth/admin/users/stats';
  public static user = UrlConfig.baseUrl + '/api/v1/auth/admin/user';
}
