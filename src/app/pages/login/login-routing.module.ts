import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginLayout } from 'src/app/layouts/layouts.module';
import { LoginGuardService } from 'src/app/services/guards/login-guard.service';

import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';

const routes: Routes = [
  {
    path: '',
    component: LoginLayout,
    children: [
      { path: 'login', component: LoginPage, canActivate: [LoginGuardService] },
      {
        path: 'signup',
        component: SignupPage,
        canActivate: [LoginGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
