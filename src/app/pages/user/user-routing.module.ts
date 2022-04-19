import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';
import { AuthGuardService } from 'src/app/services/guards/auth-guard.service';
import { AdminGuardService } from 'src/app/services/guards/admin-guard.service';

import { UserIndexPage } from './index/index.page';
import { UserCreatePage } from './create/create.page';
import { UserShowPage } from './show/show.page';
import { UserUpdatePage } from './update/update.page';
import { UserDeletePage } from './delete/delete.page';
import { UserRestorePage } from './restore/restore.page';

const routes: Routes = [
  {
    path: 'user',
    component: DefaultLayout,
    canActivate: [AuthGuardService, AdminGuardService],
    children: [
      { path: '', component: UserIndexPage },
      {
        path: 'create',
        component: UserCreatePage,
      },
      {
        path: ':uid',
        component: UserShowPage,
      },
      {
        path: ':uid/update',
        component: UserUpdatePage,
      },
      {
        path: ':uid/delete',
        component: UserDeletePage,
      },
      {
        path: ':uid/restore',
        component: UserRestorePage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
