export default class Response<T> implements ResponseMessage {
  public data: T | undefined;
  public message: string | undefined;
}

export interface ResponseMessage {
  message: string | undefined;
}
