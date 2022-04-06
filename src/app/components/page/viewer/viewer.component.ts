import { Component, Input } from '@angular/core';

import { PageDetailed } from 'src/app/types/page.type';

@Component({
  selector: 'app-component-page-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class PageViewerComponent {
  protected _page: PageDetailed | null;

  constructor() {
    this._page = null;
  }

  @Input()
  set page(page: PageDetailed | null) {
    this._page = page;
  }

  get page(): PageDetailed {
    return this._page!;
  }
}
