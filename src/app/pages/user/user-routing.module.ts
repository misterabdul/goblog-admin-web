import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';
import { AuthGuardService } from 'src/app/services/guards/auth-guard.service';

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
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: UserIndexPage, canActivate: [AuthGuardService] },
      {
        path: 'create',
        component: UserCreatePage,
        canActivate: [AuthGuardService],
      },
      { path: ':id', component: UserShowPage, canActivate: [AuthGuardService] },
      {
        path: ':id/update',
        component: UserUpdatePage,
        canActivate: [AuthGuardService],
      },
      {
        path: ':id/delete',
        component: UserDeletePage,
        canActivate: [AuthGuardService],
      },
      {
        path: ':id/restore',
        component: UserRestorePage,
        canActivate: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
