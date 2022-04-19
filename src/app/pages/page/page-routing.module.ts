import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';
import { AuthGuardService } from 'src/app/services/guards/auth-guard.service';
import { EditorGuardService } from 'src/app/services/guards/editor-guard.service';

import { PageIndexPage } from './index/index.page';
import { PageCreatePage } from './create/create.page';
import { PageShowPage } from './show/show.page';
import { PageUpdatePage } from './update/update.page';
import { PageDeletePage } from './delete/delete.page';
import { PageRestorePage } from './restore/restore.page';

const routes: Routes = [
  {
    path: 'page',
    component: DefaultLayout,
    canActivate: [AuthGuardService, EditorGuardService],
    children: [
      { path: '', component: PageIndexPage },
      {
        path: 'create',
        component: PageCreatePage,
      },
      { path: ':uid', component: PageShowPage },
      {
        path: ':uid/update',
        component: PageUpdatePage,
      },
      {
        path: ':uid/delete',
        component: PageDeletePage,
      },
      {
        path: ':uid/restore',
        component: PageRestorePage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
