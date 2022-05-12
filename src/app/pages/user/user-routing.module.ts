import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';

import { UserIndexPage } from './index/index.page';
import { UserCreatePage } from './create/create.page';
import { UserShowPage } from './show/show.page';
import { UserUpdatePage } from './update/update.page';
import { UserDeletePage } from './delete/delete.page';
import { UserRestorePage } from './restore/restore.page';

import { UserTabActiveComponent } from 'src/app/components/user/tab-active/tab-active.component';
import { UserTabTrashComponent } from 'src/app/components/user/tab-trash/tab-trash.component';

import {
  UserIndexTabActiveResolver,
  UserIndexTabActiveStatsResolver,
  UserIndexTabTrashResolver,
  UserIndexTabTrashStatsResolver,
} from './index/index.resolver';
import { UserShowResolver } from './show/show.resolver';
import { UserUpdateResolver } from './update/update.resolver';
import { UserDeleteResolver } from './delete/delete.resolver';
import { UserRestoreResolver } from './restore/restore.resolver';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: UserIndexPage,
        children: [
          {
            path: '',
            component: UserTabActiveComponent,
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            resolve: {
              users: UserIndexTabActiveResolver,
              stats: UserIndexTabActiveStatsResolver,
            },
          },
          {
            path: 'trash',
            component: UserTabTrashComponent,
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            resolve: {
              users: UserIndexTabTrashResolver,
              stats: UserIndexTabTrashStatsResolver,
            },
          },
        ],
      },
      {
        path: 'create',
        component: UserCreatePage,
      },
      {
        path: ':uid',
        component: UserShowPage,
        resolve: { user: UserShowResolver },
      },
      {
        path: ':uid/update',
        component: UserUpdatePage,
        resolve: { user: UserUpdateResolver },
      },
      {
        path: ':uid/delete',
        component: UserDeletePage,
        resolve: { user: UserDeleteResolver },
      },
      {
        path: ':uid/restore',
        component: UserRestorePage,
        resolve: { user: UserRestoreResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
