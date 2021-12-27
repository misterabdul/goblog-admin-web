import { SPACE } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { CategoryData } from 'src/app/types/category.type';
import PostDetailed, {
  Post,
  PostCategory,
  PostFormData,
} from 'src/app/types/post.type';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-component-post-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class PostEditorComponent implements AfterViewInit {
  private _routerService: Router;
  private _snackBarService: MatSnackBar;
  private _categoryService: CategoryService;
  private _postService: PostService;

  private _categories: Array<CategoryData>;
  private _formModel: FormModel;
  private _mode: 'create' | 'update';
  private _post: Post | null;

  constructor(
    routerService: Router,
    snackBarService: MatSnackBar,
    categoryService: CategoryService,
    postService: PostService
  ) {
    this._routerService = routerService;
    this._snackBarService = snackBarService;
    this._categoryService = categoryService;
    this._postService = postService;
    this._mode = 'create';
    this._post = null;

    this._categories = new Array();
    this._formModel = new FormModel();
  }

  ngAfterViewInit(): void {
    this._categoryService.getCategories().subscribe((response) => {
      this._categories = response?.data!.map<CategoryData>((value) => {
        const category: CategoryData = {
          name: value.name,
          slug: value.slug,
        };
        return category;
      });
    });
  }

  private submitForm(): Observable<PostDetailed> {
    return this._postService.submitDraftPost(this._formModel.getFormData());
  }

  private submitFormUpdate(): Observable<void> {
    return this._postService.submitUpdatePost(
      this._post?.uid!,
      this._formModel.getFormData()
    );
  }

  public categorySelectComparator(
    category1: CategoryData,
    category2: CategoryData
  ): boolean {
    return category1.slug === category2.slug;
  }

  public saveDraft() {
    if (!this._formModel.isSubmitting) {
      this._formModel.submitting();

      this.submitForm()
        .pipe(
          finalize(() => {
            this._formModel.submitDone();
          })
        )
        .subscribe(
          (post) => {
            this._routerService.navigate(['/post']);
          },
          (error) => {
            if (error instanceof HttpErrorResponse) {
              this._snackBarService.open(
                error.error?.message ?? 'Unknown error.',
                undefined,
                {
                  duration: 3000,
                }
              );
            } else {
              this._snackBarService.open('Unknown error.', undefined, {
                duration: 3000,
              });
            }
          }
        );
    }
  }

  public savePublish() {
    if (!this.formModel.isSubmitting) {
      if (this.mode === 'create') {
        this._snackBarService.open('Not implemented yet', undefined, {
          duration: 3000,
        });
      } else {
        this._snackBarService.open('Not implemented yet', undefined, {
          duration: 3000,
        });
      }
    }
  }

  public saveUpdate() {
    if (!this._formModel.isSubmitting) {
      this._formModel.submitting();

      this.submitFormUpdate()
        .pipe(
          finalize(() => {
            this._formModel.submitDone();
          })
        )
        .subscribe(
          () => {
            this._routerService.navigate(['/post']);
          },
          (error) => {
            if (error instanceof HttpErrorResponse) {
              this._snackBarService.open(
                error.error?.message ?? 'Unknown error.',
                undefined,
                {
                  duration: 3000,
                }
              );
            } else {
              this._snackBarService.open('Unknown error.', undefined, {
                duration: 3000,
              });
            }
          }
        );
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
  set post(post: Post | null) {
    this._post = post;
    if (this._post !== null) {
      this._formModel.fillFormData(this._post);
      this._mode = 'update';
    } else {
      this._formModel.emptyFormData();
      this._mode = 'create';
    }
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
  public isSubmitting: boolean;

  constructor() {
    this.title = new FormControl('', [Validators.required]);
    this.slug = new FormControl('', []);
    this.categories = new FormControl('', [Validators.required]);
    this.tags = new FormControl('', []);
    this.content = new FormControl('', []);
    this.tagSeparator = [SPACE] as const;
    this.canPublish = false;
    this.isSubmitting = false;

    this.emptyFormData();
  }

  public emptyFormData() {
    this.title.setValue(null);
    this.slug.setValue(null);
    this.categories.setValue([]);
    this.tags.setValue([]);
    this.content.setValue(null);
  }

  public fillFormData(post: Post) {
    this.title.setValue(post.title!);
    this.slug.setValue(post.slug!);
    this.categories.setValue(post.categories![0]);
    this.tags.setValue(post.tags!);
    this.content.setValue(post.content!);

    if (post.publishedAt === null) {
      this.canPublish = true;
    } else {
      this.canPublish = false;
    }
  }

  public getFormData(): PostFormData {
    return new PostFormData(
      this.title.value,
      this.categories.value,
      this.slug.value,
      this.tags.value,
      this.content.value
    );
  }

  public submitting() {
    this.title.disable();
    this.slug.disable();
    this.categories.disable();
    this.tags.disable();
    this.content.disable();
    this.isSubmitting = true;
  }

  public submitDone() {
    this.title.enable();
    this.slug.enable();
    this.categories.enable();
    this.tags.enable();
    this.content.enable();
    this.isSubmitting = false;
  }
}
