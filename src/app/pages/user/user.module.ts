import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LayoutModule } from 'src/app/layouts/layouts.module';
import { ComponentModule } from 'src/app/components/components.module';

import { UserRoutingModule } from './user-routing.module';
import { UserIndexPage } from './index/index.page';
import { UserCreatePage } from './create/create.page';
import { UserShowPage } from './show/show.page';
import { UserUpdatePage } from './update/update.page';
import { UserDeletePage } from './delete/delete.page';
import { UserRestorePage } from './restore/restore.page';

@NgModule({
  declarations: [
    UserIndexPage,
    UserCreatePage,
    UserShowPage,
    UserUpdatePage,
    UserDeletePage,
    UserRestorePage,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    LayoutModule,
    ComponentModule,
    UserRoutingModule,
  ],
})
export class UserModule {}
