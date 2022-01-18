import { Time } from '@angular/common';

import { ResponseMessage, TimeMeta } from './response.type';

export interface UserCommon {
  username: string | undefined;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
}

export class User implements ResponseMessage, UserCommon {
  public uid: string | undefined;
  public username: string | undefined;
  public email: string | undefined;
  public firstName: string | undefined;
  public lastName: string | undefined;

  public message: string | undefined;
}

export class UserDetailed extends User implements TimeMeta {
  public roles: Array<UserRole> | undefined;
  public createdAt: Time | undefined;
  public updatedAt: Time | undefined;
  public deletedAt: Time | null | undefined;
}

export class UserRole {
  public level: number | undefined;
  public name: string | undefined;
  public since: Time | undefined;
}

export class LoginFormData {
  public username: string | undefined;
  public password: string | undefined;

  constructor(username?: string | undefined, password?: string | undefined) {
    this.username = username;
    this.password = password;
  }
}

export class UserFormData {
  public username: string | undefined;
  public email: string | undefined;
  public firstName: string | undefined;
  public lastName: string | undefined;
  public password: string | undefined;
  public passwordConfirm: string | undefined;
  public roles: Array<number> | undefined;

  constructor(
    username?: string | undefined,
    email?: string | undefined,
    firstName?: string | undefined,
    lastName?: string | undefined,
    password?: string | undefined,
    passwordConfirm?: string | undefined,
    roles?: Array<number> | undefined
  ) {
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.passwordConfirm = passwordConfirm;
    this.roles = roles;
  }
}
