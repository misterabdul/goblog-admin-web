import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from 'src/app/layouts/layouts.module';
import { ComponentModule } from 'src/app/components/components.module';

import { UserRoutingModule } from './user-routing.module';
import { UserIndexPage } from './index/index.page';
import { UserCreatePage } from './create/create.page';
import { UserShowPage } from './show/show.page';
import { UserUpdatePage } from './update/update.page';
import { UserDeletePage } from './delete/delete.page';

@NgModule({
  declarations: [
    UserIndexPage,
    UserCreatePage,
    UserShowPage,
    UserUpdatePage,
    UserDeletePage,
  ],
  imports: [CommonModule, LayoutModule, ComponentModule, UserRoutingModule],
})
export class UserModule {}
