import { SPACE } from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { CategoryService } from 'src/app/services/category.service';
import { CategoryData } from 'src/app/types/category.type';
import {
  PostDetailed,
  PostCategory,
  PostFormData,
} from 'src/app/types/post.type';
import { PostViewerComponent } from '../viewer/viewer.component';

@Component({
  selector: 'app-component-post-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class PostEditorComponent
  extends PostViewerComponent
  implements AfterViewInit
{
  private _categoryService: CategoryService;

  private _mode: 'create' | 'update';
  private _submitting: boolean;
  private _categories: Array<CategoryData>;
  private _formModel: FormModel;

  @Output()
  public ngSubmit: EventEmitter<PostFormData>;

  constructor(categoryService: CategoryService) {
    super();
    this._categoryService = categoryService;

    this._mode = 'create';
    this._submitting = false;
    this._categories = new Array();
    this._formModel = new FormModel();

    this.ngSubmit = new EventEmitter<PostFormData>();
  }

  ngAfterViewInit(): void {
    this._categoryService.getCategories().subscribe({
      next: (response) => {
        this._categories = response?.data!.map<CategoryData>((value) => {
          const category: CategoryData = {
            uid: value.uid,
            name: value.name,
            slug: value.slug,
          };
          return category;
        });
      },
    });
  }

  public save(publishNow: boolean) {
    if (!this._submitting) {
      this.ngSubmit.emit(this._formModel.getFormData(publishNow));
    }
  }

  get categories(): Array<PostCategory> {
    return this._categories;
  }

  get formModel(): FormModel {
    return this._formModel;
  }

  get mode(): 'create' | 'update' {
    return this._mode;
  }

  @Input()
  set post(post: PostDetailed | null) {
    this._post = post;
    if (this._post !== null) {
      this._formModel.fillFormData(this._post);
      this._mode = 'update';
    } else {
      this._formModel.emptyFormData();
      this._mode = 'create';
    }
  }

  get post(): PostDetailed {
    return this._post!;
  }

  @Input()
  set submitting(submitting: boolean) {
    this._submitting = submitting;
    if (this._submitting) this._formModel.submitting();
    else this._formModel.submitDone();
  }

  get submitting(): boolean {
    return this._submitting;
  }
}

class FormModel {
  public title: FormControl;
  public slug: FormControl;
  public categories: FormControl;
  public tags: FormControl;
  public content: FormControl;
  public tagSeparator: any;
  public canPublish: boolean;

  constructor() {
    this.title = new FormControl(null, [Validators.required]);
    this.slug = new FormControl(null, []);
    this.categories = new FormControl([], [Validators.required]);
    this.tags = new FormControl(null, []);
    this.content = new FormControl(null, []);
    this.tagSeparator = [SPACE] as const;
    this.canPublish = false;

    this.emptyFormData();
  }

  public emptyFormData() {
    this.title.setValue(null);
    this.slug.setValue(null);
    this.categories.setValue([]);
    this.tags.setValue([]);
    this.content.setValue(null);
  }

  public fillFormData(post: PostDetailed) {
    this.title.setValue(post.title!);
    this.slug.setValue(post.slug!);
    this.categories.setValue(post.categories?.[0].uid, { onlySelf: true });
    this.tags.setValue(post.tags!);
    this.content.setValue(post.content!);

    if (post.publishedAt === null) {
      this.canPublish = true;
    } else {
      this.canPublish = false;
    }
  }

  public getFormData(publishNow?: boolean): PostFormData {
    return new PostFormData(
      this.title.value,
      this.categories.value,
      this.slug.value,
      this.tags.value,
      this.content.value,
      publishNow
    );
  }

  public submitting() {
    this.title.disable();
    this.slug.disable();
    this.categories.disable();
    this.tags.disable();
    this.content.disable();
  }

  public submitDone() {
    this.title.enable();
    this.slug.enable();
    this.categories.enable();
    this.tags.enable();
    this.content.enable();
  }
}
