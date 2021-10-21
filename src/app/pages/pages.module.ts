import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentModule } from '../components/components.module';
import { PageRoutingModule } from './pages-routing.module';
import { HomeModule } from './home/home.module';
import { NotFoundPage } from './notfound/notfound.page';

@NgModule({
  declarations: [NotFoundPage],
  imports: [CommonModule, ComponentModule, HomeModule, PageRoutingModule],
})
export class PageModule {}
