import { Component } from '@angular/core';

import { CommentTabCommentComponent } from '../tab-comment/tab-comment.component';

@Component({
  selector: 'app-component-comment-tab-trash',
  templateUrl: './tab-trash.component.html',
  styleUrls: ['./tab-trash.component.scss'],
})
export class CommentTabTrashComponent extends CommentTabCommentComponent {}
