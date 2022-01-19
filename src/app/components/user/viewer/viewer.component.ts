import { Component, Input } from '@angular/core';

import { UserDetailed, UserRole } from 'src/app/types/user.type';

@Component({
  selector: 'app-component-user-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class UserViewerComponent {
  private _roles: Array<FormUserRole>;
  protected _user: UserDetailed | null;

  constructor() {
    this._roles = [
      new FormUserRole('Editor', 2),
      new FormUserRole('Writer', 3),
    ];
    this._user = null;
  }

  public getRoleValues(
    roles?: Array<UserRole> | null | undefined
  ): Array<number> {
    if (roles) return roles.map<number>((role) => role.level!);
    return [];
  }

  @Input()
  set user(user: UserDetailed | null) {
    this._user = user;
  }

  get user(): UserDetailed | null {
    return this._user!;
  }

  get roles(): Array<FormUserRole> {
    return this._roles;
  }
}

class FormUserRole {
  public name: string;
  public level: number;

  constructor(name: string, level: number) {
    this.name = name;
    this.level = level;
  }
}
