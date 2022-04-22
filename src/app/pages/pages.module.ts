import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './pages-routing.module';

import { NotFoundPage } from './notfound/notfound.page';

@NgModule({
  declarations: [NotFoundPage],
  imports: [CommonModule, PageRoutingModule],
})
export class PageModule {}
