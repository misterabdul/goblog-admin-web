import { ResponseMessage } from './response.type';

export class AuthResponse implements ResponseMessage {
  public tokenType: string | undefined;
  public accessToken: string | undefined;

  public message: string | undefined;
}
