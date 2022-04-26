import { Injectable } from '@angular/core';

import { PostShowResolver } from '../show/show.resolver';

@Injectable({
  providedIn: 'root',
})
export class PostRestoreResolver extends PostShowResolver {}
