import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { Response } from 'src/app/types/response.type';
import { UserDetailed } from 'src/app/types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserIndexTabActiveResolver
  implements Resolve<UserDetailed[] | null>
{
  protected _userService: UserService;

  protected _tabObservable: Observable<Response<UserDetailed[] | null>>;

  constructor(userService: UserService) {
    this._userService = userService;

    this._tabObservable = this._userService.getUsers();
  }

  resolve(): Observable<UserDetailed[] | null> {
    return this._tabObservable.pipe(map((response) => response?.data ?? null));
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserIndexTabTrashResolver extends UserIndexTabActiveResolver {
  constructor(userService: UserService) {
    super(userService);

    this._tabObservable = this._userService.getTrashed();
  }
}
