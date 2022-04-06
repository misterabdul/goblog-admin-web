import { Time } from '@angular/common';

import { TimeMeta } from './response.type';
import { UserCommon } from './user.type';

export class Page {
  public uid: string | undefined;
  public slug: string | undefined;
  public title: string | undefined;
  public content: string | undefined;
  public author: PageAuthor | undefined;
  public publishedAt: Time | undefined;
}

export class PageDetailed extends Page implements TimeMeta {
  public createdAt: Time | undefined;
  public updatedAt: Time | undefined;
  public deletedAt: Time | null | undefined;
}

export class PageAuthor implements UserCommon {
  public username: string | undefined;
  public email: string | undefined;
  public firstName: string | undefined;
  public lastName: string | undefined;
}

export class PageFormData {
  public title: string;
  public slug: string | undefined;
  public content: string | undefined;
  public publishNow: boolean | undefined;

  constructor(
    title: string,
    slug?: string,
    content?: string,
    publishNow?: boolean
  ) {
    this.title = title;
    this.slug = slug;
    this.content = content;
    this.publishNow = publishNow;
  }
}
