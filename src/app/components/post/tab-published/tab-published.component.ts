import { Component, Input } from '@angular/core';

import { PostDetailed } from 'src/app/types/post.type';

@Component({
  selector: 'app-component-post-tab-published',
  templateUrl: './tab-published.component.html',
  styleUrls: ['./tab-published.component.scss'],
})
export class PostTabPublishedComponent {
  private _isLoading: boolean;
  private _posts: Array<PostDetailed> | null;

  constructor() {
    this._isLoading = false;
    this._posts = null;
  }

  @Input()
  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }

  @Input()
  set posts(posts: Array<PostDetailed>) {
    this._posts = posts;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get posts(): Array<PostDetailed> {
    return this._posts!;
  }

  get hasContents(): boolean {
    return this._posts !== null;
  }
}
