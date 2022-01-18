import { Component, Input } from '@angular/core';

import { PostDetailed } from 'src/app/types/post.type';

@Component({
  selector: 'app-component-post-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class PostViewerComponent {
  protected _post: PostDetailed | null;

  constructor() {
    this._post = null;
  }

  @Input()
  set post(post: PostDetailed | null) {
    this._post = post;
  }

  get post(): PostDetailed {
    return this._post!;
  }

  get selectedCategory(): string | null {
    return this._post?.categories![0].uid ?? null;
  }
}
