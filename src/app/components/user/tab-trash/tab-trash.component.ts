import { Component } from '@angular/core';

import { UserTabActiveComponent } from '../tab-active/tab-active.component';

@Component({
  selector: 'app-component-user-tab-trash',
  templateUrl: './tab-trash.component.html',
  styleUrls: ['./tab-trash.component.scss'],
})
export class UserTabTrashComponent extends UserTabActiveComponent {}
