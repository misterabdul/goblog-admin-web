import { AfterViewInit, Component } from '@angular/core';

import { PostService } from 'src/app/services/post.service';
import { PostDetailed } from 'src/app/types/post.type';

@Component({
  selector: 'app-page-post-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class PostIndexPage implements AfterViewInit {
  private _draft: Array<PostDetailed> | null;
  private _isLoadingDraft: boolean;
  private _published: Array<PostDetailed> | null;
  private _isLoadingPublished: boolean;
  private _trash: Array<PostDetailed> | null;
  private _isLoadingTrash: boolean;
  private _postService: PostService;

  constructor(postService: PostService) {
    this._draft = null;
    this._isLoadingDraft = true;
    this._published = null;
    this._isLoadingPublished = true;
    this._trash = null;
    this._isLoadingTrash = true;
    this._postService = postService;
  }

  ngAfterViewInit(): void {
    this.loadDraft();
  }

  public async loadDraft() {
    if (this._draft === null) {
      this._isLoadingDraft = true;
      this._postService.getDrafts().subscribe(
        (response) => {
          this._draft = response?.data ?? null;
        },
        (error) => {},
        () => {
          this._isLoadingDraft = false;
        }
      );
    }
  }

  public async loadPublished() {
    if (this._published === null) {
      this._isLoadingPublished = true;
      this._postService.getPublished().subscribe(
        (response) => {
          this._published = response?.data ?? null;
        },
        (error) => {},
        () => {
          this._isLoadingPublished = false;
        }
      );
    }
  }

  public async loadTrash() {
    if (this._trash === null) {
      this._isLoadingTrash = true;
      this._postService.getTrashed().subscribe(
        (response) => {
          this._trash = response?.data ?? null;
        },
        (error) => {},
        () => {
          this._isLoadingTrash = false;
        }
      );
    }
  }

  get draft(): Array<PostDetailed> {
    return this._draft!;
  }

  get isLoadingDraft(): boolean {
    return this._isLoadingDraft;
  }

  get published(): Array<PostDetailed> {
    return this._published!;
  }

  get isLoadingPublished(): boolean {
    return this._isLoadingPublished;
  }

  get trash(): Array<PostDetailed> {
    return this._trash!;
  }

  get isLoadingTrash(): boolean {
    return this._isLoadingTrash;
  }
}
