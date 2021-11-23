import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from 'src/app/layouts/layouts.module';
import { ComponentModule } from 'src/app/components/components.module';

import { PostRoutingModule } from './post-routing.module';
import { PostIndexPage } from './index/index.page';
import { PostCreatePage } from './create/create.page';
import { PostShowPage } from './show/show.page';
import { PostUpdatePage } from './update/update.page';
import { PostDeletePage } from './delete/delete.page';

@NgModule({
  declarations: [
    PostIndexPage,
    PostCreatePage,
    PostShowPage,
    PostUpdatePage,
    PostDeletePage,
  ],
  imports: [CommonModule, LayoutModule, ComponentModule, PostRoutingModule],
})
export class PostModule {}
