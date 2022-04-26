import { Injectable } from '@angular/core';

import { PostShowResolver } from '../show/show.resolver';

@Injectable({
  providedIn: 'root',
})
export class PostDeleteResolver extends PostShowResolver {}
