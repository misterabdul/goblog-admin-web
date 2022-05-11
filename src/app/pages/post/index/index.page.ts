import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-page-post-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class PostIndexPage implements OnInit {
  private _routerService: Router;

  private _activeLink: number;
  private _tabLinks: Array<TabLinks>;

  constructor(routerService: Router) {
    this._routerService = routerService;

    this._activeLink = -1;
    this._tabLinks = [
      new TabLinks('Draft', '/post'),
      new TabLinks('Published', '/post/published'),
      new TabLinks('Trash', '/post/trash'),
    ];
  }

  ngOnInit(): void {
    this._activeLink = this._tabLinks.findIndex(
      (tabLink) => tabLink.slug === this._routerService.url.split('?')[0]
    );

    this._routerService.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe({
        next: (event) => {
          if (event instanceof NavigationEnd) {
            this._activeLink = this._tabLinks.findIndex(
              (tabLink) => tabLink.slug === event.url.split('?')[0]
            );
          }
        },
      });
  }

  public navigate(url: string) {
    this._routerService.navigateByUrl(url);
  }

  get activeLink(): number {
    return this._activeLink;
  }

  get tabLinks(): Array<TabLinks> {
    return this._tabLinks;
  }
}

class TabLinks {
  constructor(public name: string, public slug: string) {}
}
