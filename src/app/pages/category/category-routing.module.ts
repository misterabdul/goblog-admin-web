import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';

import { CategoryIndexPage } from './index/index.page';
import { CategoryCreatePage } from './create/create.page';
import { CategoryShowPage } from './show/show.page';
import { CategoryUpdatePage } from './update/update.page';
import { CategoryDeletePage } from './delete/delete.page';
import { CategoryRestorePage } from './restore/restore.page';
import { CategoryTabActiveComponent } from 'src/app/components/category/tab-active/tab-active.component';
import { CategoryTabTrashComponent } from 'src/app/components/category/tab-trash/tab-trash.component';

import {
  CategoryIndexTabCategoryResolver,
  CategoryIndexTabCategoryStatsResolver,
  CategoryIndexTabTrashResolver,
  CategoryIndexTabTrashStatsResolver,
} from './index/index.resolver';
import { CategoryShowResolver } from './show/show.resolver';
import { CategoryUpdateResolver } from './update/update.resolver';
import { CategoryRestoreResolver } from './restore/restore.resolver';
import { CategoryDeleteResolver } from './delete/delete.resolver';

const routes: Routes = [
  {
    path: 'category',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: CategoryIndexPage,
        children: [
          {
            path: '',
            component: CategoryTabActiveComponent,
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            resolve: {
              categories: CategoryIndexTabCategoryResolver,
              stats: CategoryIndexTabCategoryStatsResolver,
            },
          },
          {
            path: 'trash',
            component: CategoryTabTrashComponent,
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            resolve: {
              categories: CategoryIndexTabTrashResolver,
              stats: CategoryIndexTabTrashStatsResolver,
            },
          },
        ],
      },
      {
        path: 'create',
        component: CategoryCreatePage,
      },
      {
        path: ':uid',
        component: CategoryShowPage,
        resolve: { category: CategoryShowResolver },
      },
      {
        path: ':uid/update',
        component: CategoryUpdatePage,
        resolve: { category: CategoryUpdateResolver },
      },
      {
        path: ':uid/delete',
        component: CategoryDeletePage,
        resolve: { category: CategoryDeleteResolver },
      },
      {
        path: ':uid/restore',
        component: CategoryRestorePage,
        resolve: { category: CategoryRestoreResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
