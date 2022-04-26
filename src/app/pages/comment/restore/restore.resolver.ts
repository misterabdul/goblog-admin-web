import { Injectable } from '@angular/core';

import { CommentShowResolver } from '../show/show.resolver';

@Injectable({
  providedIn: 'root',
})
export class CommentRestoreResolver extends CommentShowResolver {}
