import { Component } from '@angular/core';

import { UserShowPage } from '../show/show.page';

@Component({
  selector: 'app-page-user-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class UserDeletePage extends UserShowPage {}
