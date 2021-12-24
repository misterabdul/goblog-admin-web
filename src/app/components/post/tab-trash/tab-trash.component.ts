import { Component, Input } from '@angular/core';
import Post from 'src/app/types/post.type';

@Component({
  selector: 'app-component-post-tab-trash',
  templateUrl: './tab-trash.component.html',
  styleUrls: ['./tab-trash.component.scss'],
})
export class PostTabTrashComponent {
  private _isLoading: boolean;
  private _posts: Array<Post> | null;

  constructor() {
    this._isLoading = false;
    this._posts = null;
  }

  @Input()
  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }

  @Input()
  set posts(posts: Array<Post>) {
    this._posts = posts;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get posts(): Array<Post> {
    return this._posts!;
  }

  get hasContents(): boolean {
    return this._posts !== null;
  }
}
