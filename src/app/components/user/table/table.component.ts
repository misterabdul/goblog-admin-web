import { Component, Input } from '@angular/core';
import * as dayjs from 'dayjs';

import { UserDetailed } from 'src/app/types/user.type';

@Component({
  selector: 'app-component-user-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class UserTableComponent {
  private _isTrash: boolean;
  private _users: Array<UserDetailed> | null;
  private _displayedColumns: Array<String>;

  constructor() {
    this._isTrash = false;
    this._users = null;
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

  public properDate(rawDate: string): string {
    //TODO: more research on date time utility in javascript
    return dayjs(rawDate).format('YYYY MMM DD');
  }

  public properTime(rawDate: string): string {
    //TODO: more research on date time utility in javascript
    return dayjs(rawDate).format('HH:mm:ss');
  }

  public properName(user?: UserDetailed | undefined) {
    const firstName = user?.firstName ?? null;
    const lastName = user?.lastName ?? null;
    if (firstName !== null && lastName !== null)
      return firstName + ' ' + lastName;
    else if (firstName !== null) return firstName;
    return lastName;
  }

  @Input()
  set isTrash(isTrash: boolean) {
    this._isTrash = isTrash;
  }

  @Input()
  set users(users: Array<UserDetailed>) {
    this._users = users;
  }

  get isTrash(): boolean {
    return this._isTrash;
  }

  get users(): Array<UserDetailed> {
    return this._users!;
  }

  get displayedColumns(): Array<String> {
    return this._displayedColumns;
  }
}
