import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { UserDetailed } from 'src/app/types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserShowResolver implements Resolve<UserDetailed | null> {
  protected _userService: UserService;

  constructor(userService: UserService) {
    this._userService = userService;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<UserDetailed | null> {
    return this._userService
      .getUser(route.params['uid'] ?? '')
      .pipe(map((response) => response.data ?? null));
  }
}
