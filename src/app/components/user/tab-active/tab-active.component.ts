import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { UserDetailed } from 'src/app/types/user.type';

@Component({
  selector: 'app-component-user-tab-active',
  templateUrl: './tab-active.component.html',
  styleUrls: ['./tab-active.component.scss'],
})
export class UserTabActiveComponent implements AfterViewInit {
  private _isLoading: boolean;
  private _users: Array<UserDetailed> | null;

  @Output()
  public isDisplayed = new EventEmitter<boolean>();

  constructor() {
    this._isLoading = false;
    this._users = null;
  }

  ngAfterViewInit(): void {
    this.isDisplayed.emit(true);
  }

  @Input()
  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }

  @Input()
  set users(users: Array<UserDetailed>) {
    this._users = users;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get users(): Array<UserDetailed> {
    return this._users!;
  }

  get hasContents(): boolean {
    return this._users !== null;
  }
}
