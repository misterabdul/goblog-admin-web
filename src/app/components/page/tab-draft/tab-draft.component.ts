import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PageDetailed } from 'src/app/types/page.type';

@Component({
  selector: 'app-component-page-tab-draft',
  templateUrl: './tab-draft.component.html',
  styleUrls: ['./tab-draft.component.scss'],
})
export class PageTabDraftComponent implements AfterViewInit {
  private _isLoading: boolean;
  private _pages: Array<PageDetailed> | null;

  @Output()
  public isDisplayed = new EventEmitter<boolean>();

  constructor() {
    this._isLoading = false;
    this._pages = null;
  }

  ngAfterViewInit(): void {
    this.isDisplayed.emit(true);
  }

  @Input()
  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }

  @Input()
  set pages(pages: Array<PageDetailed>) {
    this._pages = pages;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get pages(): Array<PageDetailed> {
    return this._pages!;
  }

  get hasContents(): boolean {
    return this._pages !== null;
  }
}
