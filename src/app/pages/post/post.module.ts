import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LayoutModule } from 'src/app/layouts/layouts.module';
import { ComponentModule } from 'src/app/components/components.module';

import { PostRoutingModule } from './post-routing.module';
import { PostIndexPage } from './index/index.page';
import { PostCreatePage } from './create/create.page';
import { PostShowPage } from './show/show.page';
import { PostUpdatePage } from './update/update.page';
import { PostDeletePage } from './delete/delete.page';
import { PostRestorePage } from './restore/restore.page';

@NgModule({
  declarations: [
    PostIndexPage,
    PostCreatePage,
    PostShowPage,
    PostUpdatePage,
    PostDeletePage,
    PostRestorePage,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    LayoutModule,
    ComponentModule,
    PostRoutingModule,
  ],
})
export class PostModule {}
