import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { EditorFromTextArea } from 'codemirror';

import { DarkModeService } from 'src/app/services/darkmode.service';

type VimMode = {
  mode: string;
  subMode: string | undefined;
};

@Component({
  selector: 'app-component-shared-editor-markdown',
  templateUrl: './editor-markdown.component.html',
  styleUrls: ['./editor-markdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SharedEditorMarkdownComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SharedEditorMarkdownComponent),
      multi: true,
    },
  ],
})
export class SharedEditorMarkdownComponent
  implements ControlValueAccessor, Validator
{
  private _options = {
    lineNumbers: true,
    theme: 'default',
    mode: 'markdown',
    keyMap: 'vim',
    viewportMargin: Infinity,
  };
  private _isDisabled: boolean;
  private _model: String | undefined;
  private _editor: EditorFromTextArea | undefined;
  private _currentMode: string;
  private _currentCommand: string;
  private _onChangeCallback: (value: any) => void;
  private _onTouchedCallback: () => void;

  constructor(darkModeService: DarkModeService) {
    this._isDisabled = false;
    this._currentMode = 'normal';
    this._currentCommand = '';
    this._onChangeCallback = (value: any): void => {};
    this._onTouchedCallback = (): void => {};

    darkModeService.darkModeSubject.subscribe((isDarkMode) => {
      if (isDarkMode) {
        this._options.theme = 'material-darker';
      } else {
        this._options.theme = 'default';
      }
    });
  }

  public writeValue(model: any): void {
    this._model = model;
    this._onChangeCallback(this._model);
  }

  public registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  public setDisabledState(isDisabled: boolean) {
    this._isDisabled = isDisabled;
    if (this._isDisabled) {
      this._editor?.setOption('readOnly', 'nocursor');
    } else {
      this._editor?.setOption('readOnly', false);
    }
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  public registerOnValidatorChange(fn: () => void): void {}

  public editorInitialized(editor: EditorFromTextArea) {
    this._editor = editor;

    (this._editor as any).on('vim-keypress', (key: string) => {
      this._currentCommand += key;
    });
    (this._editor as any).on('vim-command-done', (e: any) => {
      this._currentCommand = '';
    });
    (this._editor as any).on('vim-mode-change', (newMode: VimMode) => {
      if (newMode.subMode !== undefined && newMode.subMode !== null) {
        if (newMode.subMode === 'blockwise') {
          this._currentMode = 'visual block';
          return;
        } else if (newMode.subMode === 'linewise') {
          this._currentMode = 'visual line';
          return;
        }
      }

      this._currentMode = newMode.mode;
    });
  }

  get options(): any {
    return this._options;
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  get model(): String | undefined {
    return this._model;
  }

  get currentMode(): string {
    return this._currentMode;
  }

  get currentCommand(): string {
    return this._currentCommand;
  }

  set model(model: String | undefined) {
    this._model = model;
  }

  @Input()
  set keyMap(keyMap: String) {
    const lKeyMap = keyMap.toLowerCase();
    switch (true) {
      case lKeyMap === 'default':
        this._options.keyMap = 'default';
        break;
      case lKeyMap === 'vim':
        this._options.keyMap = 'vim';
        break;
    }
  }
}
