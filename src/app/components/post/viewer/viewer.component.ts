import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { CategoryData } from 'src/app/types/category.type';
import PostDetailed from 'src/app/types/post.type';

@Component({
  selector: 'app-component-post-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class PostViewerComponent {
  protected _routerService: Router;
  protected _snackBarService: MatSnackBar;
  protected _postService: PostService;

  protected _post: PostDetailed | null;

  constructor(
    routerService: Router,
    snackBarService: MatSnackBar,
    postService: PostService
  ) {
    this._routerService = routerService;
    this._snackBarService = snackBarService;
    this._postService = postService;

    this._post = null;
  }

  public categorySelectComparator(
    category1: CategoryData,
    category2: CategoryData
  ): boolean {
    return category1.slug === category2.slug;
  }

  @Input()
  set post(post: PostDetailed | null) {
    this._post = post;
  }

  get post(): PostDetailed {
    return this._post!;
  }

  get selectedCategory(): CategoryData | null {
    return this._post?.categories![0] ?? null;
  }
}
