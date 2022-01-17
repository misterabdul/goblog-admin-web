import { Component } from '@angular/core';

import { UserShowPage } from '../show/show.page';

@Component({
  selector: 'app-page-user-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UserUpdatePage extends UserShowPage {}
