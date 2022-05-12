import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';

import { PageIndexPage } from './index/index.page';
import { PageCreatePage } from './create/create.page';
import { PageShowPage } from './show/show.page';
import { PageUpdatePage } from './update/update.page';
import { PageDeletePage } from './delete/delete.page';
import { PageRestorePage } from './restore/restore.page';

import { PageTabDraftComponent } from 'src/app/components/page/tab-draft/tab-draft.component';
import { PageTabPublishedComponent } from 'src/app/components/page/tab-published/tab-published.component';
import { PageTabTrashComponent } from 'src/app/components/page/tab-trash/tab-trash.component';

import {
  PageIndexTabDraftResolver,
  PageIndexTabDraftStatsResolver,
  PageIndexTabPublishedResolver,
  PageIndexTabPublishedStatsResolver,
  PageIndexTabTrashResolver,
  PageIndexTabTrashStatsResolver,
} from './index/index.resolver';
import { PageShowResolver } from './show/show.resolver';
import { PageUpdateResolver } from './update/update.resolver';
import { PageDeleteResolver } from './delete/delete.resolver';
import { PageRestoreResolver } from './restore/restore.resolver';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: PageIndexPage,
        children: [
          {
            path: '',
            component: PageTabDraftComponent,
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            resolve: {
              pages: PageIndexTabDraftResolver,
              stats: PageIndexTabDraftStatsResolver,
            },
          },
          {
            path: 'published',
            component: PageTabPublishedComponent,
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            resolve: {
              pages: PageIndexTabPublishedResolver,
              stats: PageIndexTabPublishedStatsResolver,
            },
          },
          {
            path: 'trash',
            component: PageTabTrashComponent,
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            resolve: {
              pages: PageIndexTabTrashResolver,
              stats: PageIndexTabTrashStatsResolver,
            },
          },
        ],
      },
      {
        path: 'create',
        component: PageCreatePage,
      },
      {
        path: ':uid',
        component: PageShowPage,
        resolve: { page: PageShowResolver },
      },
      {
        path: ':uid/update',
        component: PageUpdatePage,
        resolve: { page: PageUpdateResolver },
      },
      {
        path: ':uid/delete',
        component: PageDeletePage,
        resolve: { page: PageDeleteResolver },
      },
      {
        path: ':uid/restore',
        component: PageRestorePage,
        resolve: { page: PageRestoreResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
