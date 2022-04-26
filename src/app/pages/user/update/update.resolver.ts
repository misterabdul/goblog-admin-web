import { Injectable } from '@angular/core';

import { UserShowResolver } from '../show/show.resolver';

@Injectable({
  providedIn: 'root',
})
export class UserUpdateResolver extends UserShowResolver {}
