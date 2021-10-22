import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundLayout } from '../layouts/layouts.module';

import { NotFoundPage } from './notfound/notfound.page';

const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundLayout,
    children: [{ path: '', component: NotFoundPage }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
