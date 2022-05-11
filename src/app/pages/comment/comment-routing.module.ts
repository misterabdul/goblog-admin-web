import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';

import { CommentIndexPage } from './index/index.page';
import { CommentShowPage } from './show/show.page';
import { CommentDeletePage } from './delete/delete.page';
import { CommentRestorePage } from './restore/restore.page';

import { CommentTabCommentComponent } from 'src/app/components/comment/tab-comment/tab-comment.component';
import { CommentTabTrashComponent } from 'src/app/components/comment/tab-trash/tab-trash.component';

import {
  CommentIndexTabCommentResolver,
  CommentIndexTabCommentStatsResolver,
  CommentIndexTabTrashResolver,
  CommentIndexTabTrashStatsResolver,
} from './index/index.resolver';
import { CommentShowResolver } from './show/show.resolver';
import { CommentDeleteResolver } from './delete/delete.resolver';
import { CommentRestoreResolver } from './restore/restore.resolver';

const routes: Routes = [
  {
    path: 'comment',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: CommentIndexPage,
        children: [
          {
            path: '',
            component: CommentTabCommentComponent,
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            resolve: {
              comments: CommentIndexTabCommentResolver,
              stats: CommentIndexTabCommentStatsResolver,
            },
          },
          {
            path: 'trash',
            component: CommentTabTrashComponent,
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            resolve: {
              comments: CommentIndexTabTrashResolver,
              stats: CommentIndexTabTrashStatsResolver,
            },
          },
        ],
      },
      {
        path: ':uid',
        component: CommentShowPage,
        resolve: { comment: CommentShowResolver },
      },
      {
        path: ':uid/delete',
        component: CommentDeletePage,
        resolve: { comment: CommentDeleteResolver },
      },
      {
        path: ':uid/restore',
        component: CommentRestorePage,
        resolve: { comment: CommentRestoreResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentRoutingModule {}
