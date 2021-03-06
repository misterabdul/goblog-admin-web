import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

import { DefaultLayout } from './default/default.layout';
import { LoginLayout } from './login/login.layout';
import { ComponentModule } from '../components/components.module';
import { NotFoundLayout } from './notfound/notfound.layout';

@NgModule({
  declarations: [DefaultLayout, LoginLayout, NotFoundLayout],
  imports: [CommonModule, RouterModule, MatSidenavModule, ComponentModule],
})
export class LayoutModule {}

export { DefaultLayout, LoginLayout, NotFoundLayout };
