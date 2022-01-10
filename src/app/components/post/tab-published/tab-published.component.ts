import { Component } from '@angular/core';

import { PostTabDraftComponent } from '../tab-draft/tab-draft.component';

@Component({
  selector: 'app-component-post-tab-published',
  templateUrl: './tab-published.component.html',
  styleUrls: ['./tab-published.component.scss'],
})
export class PostTabPublishedComponent extends PostTabDraftComponent {}
