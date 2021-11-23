import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';
import { AuthGuardService } from 'src/app/services/guards/auth-guard.service';

import { PostIndexPage } from './index/index.page';
import { PostCreatePage } from './create/create.page';
import { PostShowPage } from './show/show.page';
import { PostUpdatePage } from './update/update.page';
import { PostDeletePage } from './delete/delete.page';

const routes: Routes = [
  {
    path: 'post',
    component: DefaultLayout,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: PostIndexPage, canActivate: [AuthGuardService] },
      {
        path: 'create',
        component: PostCreatePage,
        canActivate: [AuthGuardService],
      },
      { path: ':id', component: PostShowPage, canActivate: [AuthGuardService] },
      {
        path: ':id/update',
        component: PostUpdatePage,
        canActivate: [AuthGuardService],
      },
      {
        path: ':id/delete',
        component: PostDeletePage,
        canActivate: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
