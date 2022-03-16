import { Time } from '@angular/common';

export class Comment {
  public uid: string | undefined;
  public postUid: string | undefined;
  public parentCommentUid: string | undefined;
  public email: string | undefined;
  public name: string | undefined;
  public content: string | undefined;
  public replyCount: number | undefined;
  public createdAt: Time | undefined;
}

export class CommentDetailed extends Comment {
  public deletedAt: Time | null | undefined;
}
