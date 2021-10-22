import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentModule } from '../components/components.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { PageRoutingModule } from './pages-routing.module';

import { NotFoundPage } from './notfound/notfound.page';

@NgModule({
  declarations: [NotFoundPage],
  imports: [
    CommonModule,
    ComponentModule,
    HomeModule,
    LoginModule,
    PageRoutingModule,
  ],
})
export class PageModule {}
