import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-shared-content-markdown',
  templateUrl: './content-markdown.component.html',
  styleUrls: ['./content-markdown.component.scss'],
})
export class SharedContentMarkdownComponent {
  private _isSrcMode: boolean;
  private _src: String | undefined;
  private _content: String | undefined;

  constructor() {
    this._isSrcMode = false;
    this._src = undefined;
    this._content = undefined;
  }

  @Input()
  set src(value: String | undefined) {
    this._src = value;
    this._isSrcMode = true;
    this._content = undefined;
  }

  @Input()
  set content(value: String | undefined) {
    if (!this._isSrcMode) {
      this._content = value;
      this._src = undefined;
    }
  }

  get src(): String | undefined {
    return this._src;
  }

  get isSrcMode(): boolean {
    return this._isSrcMode;
  }

  get content(): String | undefined {
    return this._content;
  }
}
