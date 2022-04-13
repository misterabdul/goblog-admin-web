import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';
import { AuthGuardService } from 'src/app/services/guards/auth-guard.service';

import { CategoryIndexPage } from './index/index.page';
import { CategoryCreatePage } from './create/create.page';
import { CategoryShowPage } from './show/show.page';
import { CategoryUpdatePage } from './update/update.page';
import { CategoryDeletePage } from './delete/delete.page';
import { CategoryRestorePage } from './restore/restore.page';

const routes: Routes = [
  {
    path: 'category',
    component: DefaultLayout,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: CategoryIndexPage,
        canActivate: [AuthGuardService],
      },
      {
        path: 'create',
        component: CategoryCreatePage,
        canActivate: [AuthGuardService],
      },
      {
        path: ':uid',
        component: CategoryShowPage,
        canActivate: [AuthGuardService],
      },
      {
        path: ':uid/update',
        component: CategoryUpdatePage,
        canActivate: [AuthGuardService],
      },
      {
        path: ':uid/delete',
        component: CategoryDeletePage,
        canActivate: [AuthGuardService],
      },
      {
        path: ':uid/restore',
        component: CategoryRestorePage,
        canActivate: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
