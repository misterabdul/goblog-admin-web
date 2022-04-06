import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';
import { AuthGuardService } from 'src/app/services/guards/auth-guard.service';

import { PageIndexPage } from './index/index.page';
import { PageCreatePage } from './create/create.page';
import { PageShowPage } from './show/show.page';
import { PageUpdatePage } from './update/update.page';
import { PageDeletePage } from './delete/delete.page';
import { PageRestorePage } from './restore/restore.page';

const routes: Routes = [
  {
    path: 'page',
    component: DefaultLayout,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: PageIndexPage, canActivate: [AuthGuardService] },
      {
        path: 'create',
        component: PageCreatePage,
        canActivate: [AuthGuardService],
      },
      { path: ':uid', component: PageShowPage, canActivate: [AuthGuardService] },
      {
        path: ':uid/update',
        component: PageUpdatePage,
        canActivate: [AuthGuardService],
      },
      {
        path: ':uid/delete',
        component: PageDeletePage,
        canActivate: [AuthGuardService],
      },
      {
        path: ':uid/restore',
        component: PageRestorePage,
        canActivate: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
