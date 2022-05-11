import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommentDetailed } from 'src/app/types/comment.type';

@Component({
  selector: 'app-component-comment-tab-comment',
  templateUrl: './tab-comment.component.html',
  styleUrls: ['./tab-comment.component.scss'],
})
export class CommentTabCommentComponent implements OnInit {
  private _activatedRouteService: ActivatedRoute;

  private _comments: Array<CommentDetailed> | null;

  constructor(activatedRouteService: ActivatedRoute) {
    this._activatedRouteService = activatedRouteService;

    this._comments = null;
  }

  ngOnInit(): void {
    this._comments = this._activatedRouteService.snapshot.data.comments ?? null;

    this._activatedRouteService.data.subscribe({
      next: (data) => {
        this._comments = data.comments;
      },
    });
  }

  get comments(): Array<CommentDetailed> | null {
    return this._comments;
  }
}
