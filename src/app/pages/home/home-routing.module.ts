import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';
import { AuthGuardService } from 'src/app/services/guards/auth-guard.service';

import { HomeIndexPage } from './index/index.page';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayout,
    canActivate: [AuthGuardService],
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
