import { Component } from '@angular/core';

import { CategoryTabActiveComponent } from '../tab-active/tab-active.component';

@Component({
  selector: 'app-component-category-tab-trash',
  templateUrl: './tab-trash.component.html',
  styleUrls: ['./tab-trash.component.scss'],
})
export class CategoryTabTrashComponent extends CategoryTabActiveComponent {}
