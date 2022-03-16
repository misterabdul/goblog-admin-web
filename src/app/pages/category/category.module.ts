import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LayoutModule } from 'src/app/layouts/layouts.module';
import { ComponentModule } from 'src/app/components/components.module';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryIndexPage } from './index/index.page';
import { CategoryCreatePage } from './create/create.page';
import { CategoryShowPage } from './show/show.page';
import { CategoryUpdatePage } from './update/update.page';
import { CategoryDeletePage } from './delete/delete.page';
import { CategoryRestorePage } from './restore/restore.page';

@NgModule({
  declarations: [
    CategoryIndexPage,
    CategoryCreatePage,
    CategoryShowPage,
    CategoryUpdatePage,
    CategoryDeletePage,
    CategoryRestorePage,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    LayoutModule,
    ComponentModule,
    CategoryRoutingModule,
  ],
})
export class CategoryModule {}
