import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LayoutModule } from 'src/app/layouts/layouts.module';
import { ComponentModule } from 'src/app/components/components.module';

import { CommentRoutingModule } from './comment-routing.module';
import { CommentIndexPage } from './index/index.page';
import { CommentShowPage } from './show/show.page';
import { CommentDeletePage } from './delete/delete.page';
import { CommentRestorePage } from './restore/restore.page';

@NgModule({
  declarations: [
    CommentIndexPage,
    CommentShowPage,
    CommentDeletePage,
    CommentRestorePage,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    LayoutModule,
    ComponentModule,
    CommentRoutingModule,
  ],
})
export class CommentModule {}
