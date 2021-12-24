import { ResponseMessage } from './response.type';

export default class AuthResponse implements ResponseMessage {
  public tokenType: string | undefined;
  public accessToken: string | undefined;

  public message: string | undefined;
}
