import { Injectable } from '@angular/core';

import { CategoryShowResolver } from '../show/show.resolver';

@Injectable({
  providedIn: 'root',
})
export class CategoryDeleteResolver extends CategoryShowResolver {}
