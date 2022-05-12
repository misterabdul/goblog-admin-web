import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginLayout } from 'src/app/layouts/layouts.module';

import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';

const routes: Routes = [
  {
    path: '',
    component: LoginLayout,
    children: [
      { path: '', component: LoginPage },
      {
        path: 'signup',
        component: SignupPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
