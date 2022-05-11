import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserDetailed } from 'src/app/types/user.type';

@Component({
  selector: 'app-component-user-tab-active',
  templateUrl: './tab-active.component.html',
  styleUrls: ['./tab-active.component.scss'],
})
export class UserTabActiveComponent implements OnInit {
  private _activatedRouteService: ActivatedRoute;

  private _users: Array<UserDetailed> | null;

  constructor(activatedRouteService: ActivatedRoute) {
    this._activatedRouteService = activatedRouteService;

    this._users = null;
  }

  ngOnInit(): void {
    this._users = this._activatedRouteService.snapshot.data.users ?? null;

    this._activatedRouteService.data.subscribe({
      next: (data) => {
        this._users = data.users;
      },
    });
  }

  get users(): Array<UserDetailed> | null {
    return this._users;
  }
}
