import { Component } from '@angular/core';

import { PageTabDraftComponent } from '../tab-draft/tab-draft.component';

@Component({
  selector: 'app-component-page-tab-published',
  templateUrl: './tab-published.component.html',
  styleUrls: ['./tab-published.component.scss'],
})
export class PageTabPublishedComponent extends PageTabDraftComponent {}
