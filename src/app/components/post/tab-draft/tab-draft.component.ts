import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostDetailed } from 'src/app/types/post.type';

@Component({
  selector: 'app-component-post-tab-draft',
  templateUrl: './tab-draft.component.html',
  styleUrls: ['./tab-draft.component.scss'],
})
export class PostTabDraftComponent implements OnInit {
  private _activatedRouteService: ActivatedRoute;

  private _posts: Array<PostDetailed> | null;

  constructor(activatedRouteService: ActivatedRoute) {
    this._activatedRouteService = activatedRouteService;

    this._posts = null;
  }

  ngOnInit(): void {
    this._posts = this._activatedRouteService.snapshot.data.posts ?? null;

    this._activatedRouteService.data.subscribe({
      next: (data) => {
        this._posts = data.posts;
      },
    });
  }

  get posts(): Array<PostDetailed> | null {
    return this._posts;
  }
}
