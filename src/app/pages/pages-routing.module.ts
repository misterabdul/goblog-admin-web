import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayout } from 'src/app/layouts/layouts.module';
import { NotFoundPage } from './notfound/notfound.page';

const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    component: DefaultLayout,
    children: [{ path: '', component: NotFoundPage }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
