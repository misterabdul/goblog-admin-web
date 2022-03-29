import { AfterViewInit, Component, Input } from '@angular/core';
import { MarkdownService } from '@misterabdul/ngx-markdown';

import { DarkModeService } from 'src/app/services/darkmode.service';
import { MarkedRendererHelpers } from 'src/app/utils/marked-renderer.util';

@Component({
  selector: 'app-component-shared-content-markdown',
  templateUrl: './content-markdown.component.html',
  styleUrls: ['./content-markdown.component.scss'],
})
export class SharedContentMarkdownComponent implements AfterViewInit {
  private _darkModeService: DarkModeService;
  private _markdownService: MarkdownService;
  private _markedRendererHelpers: MarkedRendererHelpers;

  private _isSrcMode: boolean;
  private _src: String | undefined;
  private _content: String | undefined;

  constructor(
    darkModeService: DarkModeService,
    markdownService: MarkdownService
  ) {
    this._darkModeService = darkModeService;
    this._markdownService = markdownService;
    this._markedRendererHelpers = new MarkedRendererHelpers();

    this._isSrcMode = false;
    this._src = undefined;
    this._content = undefined;
  }

  ngAfterViewInit(): void {
    // this._darkModeService.darkModeSubject.subscribe({
    //   next: (isDarkMode) => {
    //     this._markdownService.renderer.link =
    //       this._markedRendererHelpers.linkRenderer(
    //         this._markdownService.renderer,
    //         isDarkMode
    //       );
    //     this._markdownService.renderer.code =
    //       this._markedRendererHelpers.codeRenderer(
    //         this._markdownService.renderer,
    //         isDarkMode
    //       );
    //     this._markdownService.renderer.image =
    //       this._markedRendererHelpers.imageRenderer(
    //         this._markdownService.renderer,
    //         isDarkMode
    //       );
    //     this._markdownService.reload();
    //   },
    // });
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
