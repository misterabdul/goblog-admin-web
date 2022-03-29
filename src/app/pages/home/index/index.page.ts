import { Component } from '@angular/core';

@Component({
  selector: 'app-page-home-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class HomeIndexPage {
  public content =
    new String(`# Simple Blog App Admin\nAdmin portion of my simple blog web app. Built with Angular.
  Backend built with Gin Gonic & MongoDB database.`);
}
