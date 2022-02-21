import { Time } from '@angular/common';

import { ResponseMessage, TimeMeta } from './response.type';

export class Comment implements ResponseMessage {
  public uid: string | undefined;
  public postUid: string | undefined;
  public parentCommentUid: string | undefined;
  public email: string | undefined;
  public name: string | undefined;
  public content: string | undefined;
  public replyCount: number | undefined;
  public createdAt: Time | undefined;

  public message: string | undefined;
}

export class CommentDetailed extends Comment {
  public deletedAt: Time | null | undefined;
}
