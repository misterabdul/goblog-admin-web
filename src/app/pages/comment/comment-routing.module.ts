import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';
import { AuthGuardService } from 'src/app/services/guards/auth-guard.service';
import { WriterGuardService } from 'src/app/services/guards/writer-guard.service';

import { CommentIndexPage } from './index/index.page';
import { CommentShowPage } from './show/show.page';
import { CommentDeletePage } from './delete/delete.page';
import { CommentRestorePage } from './restore/restore.page';

const routes: Routes = [
  {
    path: 'comment',
    component: DefaultLayout,
    canActivate: [AuthGuardService, WriterGuardService],
    children: [
      {
        path: '',
        component: CommentIndexPage,
      },
      {
        path: ':uid',
        component: CommentShowPage,
      },
      {
        path: ':uid/delete',
        component: CommentDeletePage,
      },
      {
        path: ':uid/restore',
        component: CommentRestorePage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentRoutingModule {}
