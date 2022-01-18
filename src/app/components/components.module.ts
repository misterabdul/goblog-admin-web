import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MarkdownModule } from '@misterabdul/ngx-markdown';
import { CodemirrorModule } from '@misterabdul/ngx-codemirror';

import {
  SharedHeaderComponent,
  InnerLogoutDialogComponent,
} from './shared/header/header.component';
import { SharedHeaderLoginComponent } from './shared/header-login/header-login.component';
import { SharedHeaderNotFoundComponent } from './shared/header-notfound/header-notfound.component';
import { SharedSidenavLeftComponent } from './shared/sidenav-left/sidenav-left.component';
import { SharedContentMarkdownComponent } from './shared/content-markdown/content-markdown.component';
import { SharedEditorMarkdownComponent } from './shared/editor-markdown/editor-markdown.component';
import { SharedCloakComponent } from './shared/cloak/cloak.component';
import { SharedBasicDialogComponent } from './shared/basic-dialog/basic-dialog.component';

import { LoginLoginFormComponent } from './login/login-form/login-form.component';

import { PostTableComponent } from './post/table/table.component';
import { PostEditorComponent } from './post/editor/editor.component';
import { PostViewerComponent } from './post/viewer/viewer.component';
import { PostTrashViewerComponent } from './post/viewer-trash/viewer-trash.component';
import { PostTabDraftComponent } from './post/tab-draft/tab-draft.component';
import { PostTabPublishedComponent } from './post/tab-published/tab-published.component';
import { PostTabTrashComponent } from './post/tab-trash/tab-trash.component';
import { PostInputMarkdownComponent } from './post/input-markdown/input-markdown.component';
import { PostInputTagsComponent } from './post/input-tags/input-tags.component';

import { UserTableComponent } from './user/table/table.component';
import { UserTabActiveComponent } from './user/tab-active/tab-active.component';
import { UserTabTrashComponent } from './user/tab-trash/tab-trash.component';
import { UserViewerComponent } from './user/viewer/viewer.component';
import { UserEditorComponent } from './user/editor/editor.component';
import { UserViewerTrashComponent } from './user/viewer-trash/viewer-trash.component';

@NgModule({
  declarations: [
    SharedHeaderComponent,
    InnerLogoutDialogComponent,
    SharedHeaderLoginComponent,
    SharedHeaderNotFoundComponent,
    SharedSidenavLeftComponent,
    SharedContentMarkdownComponent,
    SharedEditorMarkdownComponent,
    SharedCloakComponent,
    SharedBasicDialogComponent,

    LoginLoginFormComponent,

    PostTableComponent,
    PostEditorComponent,
    PostViewerComponent,
    PostTrashViewerComponent,
    PostTabDraftComponent,
    PostTabPublishedComponent,
    PostTabTrashComponent,
    PostInputMarkdownComponent,
    PostInputTagsComponent,

    UserTableComponent,
    UserTabActiveComponent,
    UserTabTrashComponent,
    UserViewerComponent,
    UserEditorComponent,
    UserViewerTrashComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MarkdownModule.forChild(),
    CodemirrorModule,
    MatRippleModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  exports: [
    SharedHeaderComponent,
    SharedHeaderLoginComponent,
    SharedHeaderNotFoundComponent,
    SharedSidenavLeftComponent,
    SharedContentMarkdownComponent,
    SharedEditorMarkdownComponent,
    SharedCloakComponent,
    SharedBasicDialogComponent,

    LoginLoginFormComponent,

    PostTableComponent,
    PostEditorComponent,
    PostViewerComponent,
    PostTrashViewerComponent,
    PostTabDraftComponent,
    PostTabPublishedComponent,
    PostTabTrashComponent,
    PostInputMarkdownComponent,
    PostInputTagsComponent,

    UserTableComponent,
    UserTabActiveComponent,
    UserTabTrashComponent,
    UserViewerComponent,
    UserViewerTrashComponent,
    UserEditorComponent,
  ],
})
export class ComponentModule {}
