import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';

import { CategoryIndexPage } from './index/index.page';
import { CategoryCreatePage } from './create/create.page';
import { CategoryShowPage } from './show/show.page';
import { CategoryUpdatePage } from './update/update.page';
import { CategoryDeletePage } from './delete/delete.page';
import { CategoryRestorePage } from './restore/restore.page';

const routes: Routes = [
  {
    path: 'category',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: CategoryIndexPage,
      },
      {
        path: 'create',
        component: CategoryCreatePage,
      },
      {
        path: ':uid',
        component: CategoryShowPage,
      },
      {
        path: ':uid/update',
        component: CategoryUpdatePage,
      },
      {
        path: ':uid/delete',
        component: CategoryDeletePage,
      },
      {
        path: ':uid/restore',
        component: CategoryRestorePage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
