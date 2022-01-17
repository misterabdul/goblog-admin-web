export abstract class AbstractDialogData {
  public title: string;
  public message: string;
  public cancelLabel: string | undefined;
  public okLabel: string | undefined;

  public constructor(
    title: string,
    message: string,
    cancelLabel?: string | undefined,
    okLabel?: string | undefined
  ) {
    this.title = title;
    this.message = message;
    this.cancelLabel = cancelLabel;
    this.okLabel = okLabel;
  }
}

export class BasicDialogData extends AbstractDialogData {
  public processingMessage: string | undefined;

  public constructor(
    title: string,
    message: string,
    processingMessage?: string,
    cancelLabel?: string | undefined,
    okLabel?: string | undefined
  ) {
    super(title, message, cancelLabel, okLabel);
    this.processingMessage = processingMessage;
  }
}
