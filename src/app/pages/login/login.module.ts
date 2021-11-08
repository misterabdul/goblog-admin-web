import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from 'src/app/layouts/layouts.module';
import { ComponentModule } from 'src/app/components/components.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';

@NgModule({
  declarations: [LoginPage, SignupPage],
  imports: [CommonModule, LayoutModule, ComponentModule, LoginRoutingModule],
})
export class LoginModule {}
