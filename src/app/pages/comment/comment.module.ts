import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from 'src/app/layouts/layouts.module';
import { ComponentModule } from 'src/app/components/components.module';

import { CommentRoutingModule } from './comment-routing.module';
import { CommentIndexPage } from './index/index.page';
import { CommentShowPage } from './show/show.page';
import { CommentDeletePage } from './delete/delete.page';

@NgModule({
  declarations: [CommentIndexPage, CommentShowPage, CommentDeletePage],
  imports: [CommonModule, LayoutModule, ComponentModule, CommentRoutingModule],
})
export class CommentModule {}
