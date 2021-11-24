import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';
import { AuthGuardService } from 'src/app/services/guards/auth-guard.service';

import { CommentIndexPage } from './index/index.page';
import { CommentShowPage } from './show/show.page';
import { CommentDeletePage } from './delete/delete.page';

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
        path: ':id',
        component: CommentShowPage,
        canActivate: [AuthGuardService],
      },
      {
        path: ':id/delete',
        component: CommentDeletePage,
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
