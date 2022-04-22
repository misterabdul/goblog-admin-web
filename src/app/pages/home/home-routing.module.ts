import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';

import { HomeIndexPage } from './index/index.page';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayout,
    children: [
      { path: '', component: HomeIndexPage },
      {
        path: 'dashboard',
        component: HomeIndexPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
