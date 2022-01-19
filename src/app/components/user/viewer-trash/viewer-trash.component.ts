import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { UserDetailed } from 'src/app/types/user.type';
import { UserViewerComponent } from '../viewer/viewer.component';

@Component({
  selector: 'app-component-user-viewer-trash',
  templateUrl: './viewer-trash.component.html',
  styleUrls: ['./viewer-trash.component.scss'],
})
export class UserViewerTrashComponent
  extends UserViewerComponent
  implements OnDestroy
{
  private _submitting: boolean;
  private _mode: 'delete' | 'restore';

  @Output()
  public ngSubmit: EventEmitter<UserDetailed>;

  constructor() {
    super();

    this._submitting = false;
    this._mode = 'delete';

    this.ngSubmit = new EventEmitter<UserDetailed>();
  }

  ngOnDestroy(): void {}

  public submit() {
    if (!this._submitting && this._user) {
      this.ngSubmit.emit(this._user);
    }
  }

  @Input()
  set mode(mode: 'delete' | 'restore') {
    this._mode = mode;
  }

  get mode(): 'delete' | 'restore' {
    return this._mode;
  }

  @Input()
  set submitting(submitting: boolean) {
    this._submitting = submitting;
  }

  get submitting(): boolean {
    return this._submitting;
  }
}
