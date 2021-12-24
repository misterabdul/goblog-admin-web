import { Component, Input } from '@angular/core';
import { MarkdownService } from '@misterabdul/ngx-markdown';
import { DarkModeService } from 'src/app/services/darkmode.service';
import { MarkedRendererHelpers } from 'src/app/utils/marked-renderer.util';

@Component({
  selector: 'app-component-shared-content-markdown',
  templateUrl: './content-markdown.component.html',
  styleUrls: ['./content-markdown.component.scss'],
})
export class SharedContentMarkdownComponent {
  public isDarkMode: boolean;
  public isSrcMode: boolean;
  private _src: String | undefined;
  private _content: String | undefined;

  constructor(
    darkModeService: DarkModeService,
    markdownService: MarkdownService
  ) {
    this.isDarkMode = false;
    this.isSrcMode = false;
    this._src = undefined;
    this._content = undefined;

    const helpers = new MarkedRendererHelpers();
    darkModeService.darkModeSubject.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      markdownService.renderer.link = helpers.linkRenderer(
        markdownService.renderer,
        isDarkMode
      );
      markdownService.renderer.code = helpers.codeRenderer(
        markdownService.renderer,
        isDarkMode
      );
      markdownService.renderer.image = helpers.imageRenderer(
        markdownService.renderer,
        isDarkMode
      );
      markdownService.reload();
    });
  }

  @Input()
  set src(value: String | undefined) {
    this._src = value;
    this.isSrcMode = true;
    this._content = undefined;
  }
  get src(): String | undefined {
    return this._src;
  }

  @Input()
  set content(value: String | undefined) {
    if (!this.isSrcMode) {
      this._content = value;
      this._src = undefined;
    }
  }
  get content(): String | undefined {
    return this._content;
  }
}
