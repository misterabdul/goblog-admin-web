import { Time } from '@angular/common';
import { ResponseMessage, TimeMeta } from './response.type';

export interface CategoryData {
  uid: string | undefined;
  name: string | undefined;
  slug: string | undefined;
}

export class Category implements CategoryData, ResponseMessage {
  public uid: string | undefined;
  public name: string | undefined;
  public slug: string | undefined;

  public message: string | undefined;
}

export class CategoryDetailed extends Category implements TimeMeta {
  public createdAt: Time | undefined;
  public updatedAt: Time | undefined;
  public deletedAt: Time | null | undefined;
}

export class CategoryFormData {
  public slug: string;
  public name: string;

  constructor(slug: string, name: string) {
    this.slug = slug;
    this.name = name;
  }
}
