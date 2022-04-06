import { Component } from '@angular/core';

import { PageTabDraftComponent } from '../tab-draft/tab-draft.component';

@Component({
  selector: 'app-component-page-tab-trash',
  templateUrl: './tab-trash.component.html',
  styleUrls: ['./tab-trash.component.scss'],
})
export class PageTabTrashComponent extends PageTabDraftComponent {}
