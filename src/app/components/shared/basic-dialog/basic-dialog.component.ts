import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BasicDialogData } from 'src/app/types/dialog-data.type';

@Component({
  selector: 'app-component-shared-basic-dialog',
  templateUrl: './basic-dialog.component.html',
  styleUrls: ['./basic-dialog.component.scss'],
})
export class SharedBasicDialogComponent {
  private _dialogRef: MatDialogRef<SharedBasicDialogComponent>;
  private _dialogData: BasicDialogData | undefined;

  private _isProcessing: boolean;

  public static RESULT_APPROVED = 1;
  public static RESULT_CANCELED = 0;

  @Output()
  public dialogResult: EventEmitter<number>;

  constructor(
    matDialogRef: MatDialogRef<SharedBasicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: any
  ) {
    this._dialogRef = matDialogRef;
    if (dialogData instanceof BasicDialogData) this._dialogData = dialogData;

    this._isProcessing = false;

    this.dialogResult = new EventEmitter<number>();
  }

  public approve(): void {
    this.dialogResult.emit(SharedBasicDialogComponent.RESULT_APPROVED);
  }

  public cancel(): void {
    this._dialogRef.close(SharedBasicDialogComponent.RESULT_CANCELED);
  }

  get title(): string {
    return this._dialogData?.title!;
  }

  get message(): string {
    return this._dialogData?.message!;
  }

  get processingMessage(): string {
    return this._dialogData?.processingMessage ?? this.message;
  }

  get okLabel(): string {
    return this._dialogData?.okLabel ?? 'Ok';
  }

  get cancelLabel(): string {
    return this._dialogData?.cancelLabel ?? 'Cancel';
  }

  @Input()
  set isProcessing(isProcessing: boolean) {
    this._isProcessing = isProcessing;
  }

  get isProcessing(): boolean {
    return this._isProcessing;
  }
}
