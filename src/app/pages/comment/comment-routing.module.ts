import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';
import { AuthGuardService } from 'src/app/services/guards/auth-guard.service';

import { CommentIndexPage } from './index/index.page';
import { CommentShowPage } from './show/show.page';
import { CommentDeletePage } from './delete/delete.page';
import { CommentRestorePage } from './restore/restore.page';

const routes: Routes = [
  {
    path: 'comment',
    component: DefaultLayout,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: CommentIndexPage,
        canActivate: [AuthGuardService],
      },
      {
        path: ':uid',
        component: CommentShowPage,
        canActivate: [AuthGuardService],
      },
      {
        path: ':uid/delete',
        component: CommentDeletePage,
        canActivate: [AuthGuardService],
      },
      {
        path: ':uid/restore',
        component: CommentRestorePage,
        canActivate: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentRoutingModule {}
