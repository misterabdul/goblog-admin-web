import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../services/guards/auth-guard.service';
import { LoginGuardService } from '../services/guards/login-guard.service';
import { AdminGuardService } from '../services/guards/admin-guard.service';
import { EditorGuardService } from '../services/guards/editor-guard.service';
import { WriterGuardService } from '../services/guards/writer-guard.service';
import { NotFoundLayout } from '../layouts/layouts.module';
import { NotFoundPage } from './notfound/notfound.page';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    canActivate: [LoginGuardService],
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'post',
    canActivate: [AuthGuardService, WriterGuardService],
    loadChildren: () => import('./post/post.module').then((m) => m.PostModule),
  },
  {
    path: 'comment',
    canActivate: [AuthGuardService, WriterGuardService],
    loadChildren: () =>
      import('./comment/comment.module').then((m) => m.CommentModule),
  },
  {
    path: 'category',
    canActivate: [AuthGuardService, EditorGuardService],
    loadChildren: () =>
      import('./category/category.module').then((m) => m.CategoryModule),
  },
  {
    path: 'page',
    canActivate: [AuthGuardService, EditorGuardService],
    loadChildren: () => import('./page/page.module').then((m) => m.PageModule),
  },
  {
    path: 'user',
    canActivate: [AuthGuardService, AdminGuardService],
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
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
