import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LayoutModule } from 'src/app/layouts/layouts.module';
import { ComponentModule } from 'src/app/components/components.module';

import { PageRoutingModule } from './page-routing.module';
import { PageCreatePage } from './create/create.page';
import { PageDeletePage } from './delete/delete.page';
import { PageIndexPage } from './index/index.page';
import { PageRestorePage } from './restore/restore.page';
import { PageShowPage } from './show/show.page';
import { PageUpdatePage } from './update/update.page';

@NgModule({
  declarations: [
    PageCreatePage,
    PageDeletePage,
    PageIndexPage,
    PageRestorePage,
    PageShowPage,
    PageUpdatePage,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    LayoutModule,
    ComponentModule,
    PageRoutingModule,
  ],
})
export class PageModule {}
