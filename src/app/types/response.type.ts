import { Time } from '@angular/common';

export default class Response<T> implements ResponseMessage {
  public data: T | undefined;
  public message: string | undefined;
}

export interface ResponseMessage {
  message: string | undefined;
}

export interface TimeMeta {
  createdAt: Time | undefined;
  updatedAt: Time | undefined;
  deletedAt: Time | null | undefined;
}
