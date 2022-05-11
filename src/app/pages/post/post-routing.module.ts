import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';

import { PostIndexPage } from './index/index.page';
import { PostCreatePage } from './create/create.page';
import { PostShowPage } from './show/show.page';
import { PostUpdatePage } from './update/update.page';
import { PostDeletePage } from './delete/delete.page';
import { PostRestorePage } from './restore/restore.page';

import { PostTabDraftComponent } from 'src/app/components/post/tab-draft/tab-draft.component';
import { PostTabPublishedComponent } from 'src/app/components/post/tab-published/tab-published.component';
import { PostTabTrashComponent } from 'src/app/components/post/tab-trash/tab-trash.component';

import {
  PostIndexTabDraftResolver,
  PostIndexTabDraftStatsResolver,
  PostIndexTabPublishedResolver,
  PostIndexTabPublishedStatsResolver,
  PostIndexTabTrashResolver,
  PostIndexTabTrashStatsResolver,
} from './index/index.resolver';
import { PostShowResolver } from './show/show.resolver';
import { PostUpdateResolver } from './update/update.resolver';
import { PostDeleteResolver } from './delete/delete.resolver';
import { PostRestoreResolver } from './restore/restore.resolver';

const routes: Routes = [
  {
    path: 'post',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: PostIndexPage,
        children: [
          {
            path: '',
            component: PostTabDraftComponent,
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            resolve: {
              posts: PostIndexTabDraftResolver,
              stats: PostIndexTabDraftStatsResolver,
            },
          },
          {
            path: 'published',
            component: PostTabPublishedComponent,
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            resolve: {
              posts: PostIndexTabPublishedResolver,
              stats: PostIndexTabPublishedStatsResolver,
            },
          },
          {
            path: 'trash',
            component: PostTabTrashComponent,
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            resolve: {
              posts: PostIndexTabTrashResolver,
              stats: PostIndexTabTrashStatsResolver,
            },
          },
        ],
      },
      {
        path: 'create',
        component: PostCreatePage,
      },
      {
        path: ':uid',
        component: PostShowPage,
        resolve: { post: PostShowResolver },
      },
      {
        path: ':uid/update',
        component: PostUpdatePage,
        resolve: { post: PostUpdateResolver },
      },
      {
        path: ':uid/delete',
        component: PostDeletePage,
        resolve: { post: PostDeleteResolver },
      },
      {
        path: ':uid/restore',
        component: PostRestorePage,
        resolve: { post: PostRestoreResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
