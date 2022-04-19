import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';
import { AuthGuardService } from 'src/app/services/guards/auth-guard.service';
import { WriterGuardService } from 'src/app/services/guards/writer-guard.service';

import { PostIndexPage } from './index/index.page';
import { PostCreatePage } from './create/create.page';
import { PostShowPage } from './show/show.page';
import { PostUpdatePage } from './update/update.page';
import { PostDeletePage } from './delete/delete.page';
import { PostRestorePage } from './restore/restore.page';

const routes: Routes = [
  {
    path: 'post',
    component: DefaultLayout,
    canActivate: [AuthGuardService, WriterGuardService],
    children: [
      { path: '', component: PostIndexPage },
      {
        path: 'create',
        component: PostCreatePage,
      },
      {
        path: ':uid',
        component: PostShowPage,
      },
      {
        path: ':uid/update',
        component: PostUpdatePage,
      },
      {
        path: ':uid/delete',
        component: PostDeletePage,
      },
      {
        path: ':uid/restore',
        component: PostRestorePage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
