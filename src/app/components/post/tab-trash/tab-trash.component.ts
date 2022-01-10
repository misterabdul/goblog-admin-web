import { Component } from '@angular/core';

import { PostTabDraftComponent } from '../tab-draft/tab-draft.component';

@Component({
  selector: 'app-component-post-tab-trash',
  templateUrl: './tab-trash.component.html',
  styleUrls: ['./tab-trash.component.scss'],
})
export class PostTabTrashComponent extends PostTabDraftComponent {}
