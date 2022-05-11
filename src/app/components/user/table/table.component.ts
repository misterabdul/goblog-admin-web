import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserDetailed } from 'src/app/types/user.type';
import { CommonTableComponent } from '../../shared/table/table.component';

@Component({
  selector: 'app-component-user-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class UserTableComponent
  extends CommonTableComponent<UserDetailed>
  implements OnInit
{
  constructor(activatedRouteService: ActivatedRoute) {
    super(activatedRouteService);

    this._displayedColumns = [
      'no',
      'username',
      'email',
      'name',
      'roles',
      'created-at',
      'action',
    ];
  }

  public properName(user?: UserDetailed | undefined) {
    const firstName = user?.firstName ?? null;
    const lastName = user?.lastName ?? null;
    if (firstName !== null && lastName !== null)
      return firstName + ' ' + lastName;
    else if (firstName !== null) return firstName;
    return lastName;
  }
}
