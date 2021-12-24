import { Time } from '@angular/common';
import { CategoryData } from './category.type';

import { ResponseMessage, TimeMeta } from './response.type';

export class Post implements ResponseMessage {
  public uid: string | undefined;
  public slug: string | undefined;
  public title: string | undefined;
  public description: string | undefined;
  public featuringImagePath: string | undefined;
  public content: string | undefined;
  public categories: Array<PostCategory> | undefined;
  public tags: Array<String> | undefined;
  public author: PostAuthor | undefined;
  public publishedAt: Time | undefined;

  public message: string | undefined;
}

export default class PostDetailed extends Post implements TimeMeta {
  public createdAt: Time | undefined;
  public updatedAt: Time | undefined;
  public deletedAt: Time | null | undefined;
}

export class PostAuthor {
  public username: string | undefined;
  public email: string | undefined;
  public firstName: string | undefined;
  public lastName: string | undefined;
}

export class PostCategory implements CategoryData {
  public name: string | undefined;
  public slug: string | undefined;

  constructor(name?: string, slug?: string) {
    this.name = name;
    this.slug = slug;
  }
}

export class PostFormData {
  public title: string;
  public categories: Array<CategoryData>;
  public slug: string | undefined;
  public tags: Array<string> | undefined;
  public content: string | undefined;

  constructor(
    title: string,
    categories: Array<CategoryData> | CategoryData,
    slug?: string,
    tags?: Array<string>,
    content?: string
  ) {
    this.title = title;
    this.categories = new Array();
    this.categories = this.categories.concat(categories);
    this.slug = slug;
    this.tags = tags;
    this.content = content;
  }
}
