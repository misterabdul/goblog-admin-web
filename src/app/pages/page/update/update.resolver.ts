import { Injectable } from '@angular/core';

import { PageShowResolver } from '../show/show.resolver';

@Injectable({
  providedIn: 'root',
})
export class PageUpdateResolver extends PageShowResolver {}
