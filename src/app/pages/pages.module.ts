import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { PageRoutingModule } from './pages-routing.module';

import { NotFoundPage } from './notfound/notfound.page';

@NgModule({
  declarations: [NotFoundPage],
  imports: [
    CommonModule,
    HomeModule,
    CategoryModule,
    PostModule,
    CommentModule,
    UserModule,
    LoginModule,
    PageRoutingModule,
  ],
})
export class PageModule {}
