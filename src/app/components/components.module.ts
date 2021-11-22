import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MarkdownModule } from '@misterabdul/ngx-markdown';

import {
  SharedHeaderComponent,
  InnerLogoutDialogComponent,
} from './shared/header/header.component';
import { SharedHeaderLoginComponent } from './shared/header-login/header-login.component';
import { SharedHeaderNotFoundComponent } from './shared/header-notfound/header-notfound.component';
import { SharedSidenavLeftComponent } from './shared/sidenav-left/sidenav-left.component';
import { SharedContentMarkdownComponent } from './shared/content-markdown/content-markdown.component';
import { SharedCloakComponent } from './shared/cloak/cloak.component';
import { LoginLoginFormComponent } from './login/login-form/login-form.component';

@NgModule({
  declarations: [
    SharedHeaderComponent,
    InnerLogoutDialogComponent,
    SharedHeaderLoginComponent,
    SharedHeaderNotFoundComponent,
    SharedSidenavLeftComponent,
    SharedContentMarkdownComponent,
    SharedCloakComponent,
    LoginLoginFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forChild(),
    MatRippleModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
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
    SharedCloakComponent,
    LoginLoginFormComponent,
  ],
})
export class ComponentModule {}
