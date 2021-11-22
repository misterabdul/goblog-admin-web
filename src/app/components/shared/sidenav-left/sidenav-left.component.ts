import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-shared-sidenav-left',
  templateUrl: './sidenav-left.component.html',
  styleUrls: ['./sidenav-left.component.scss'],
})
export class SharedSidenavLeftComponent {
  private _navItems: Array<SideNavItem>;

  constructor() {
    this._navItems = [
      new SideNavItem('/dashboard', 'Dashboard', 'home'),
      new SideNavItem('/posts', 'Posts', 'article'),
      new SideNavItem('/comments', 'Comments', 'comment'),
      new SideNavItem('/users', 'Users', 'people_alt'),
    ];
  }

  get navItems(): Array<SideNavItem> {
    return this._navItems;
  }
}

class SideNavItem {
  constructor(public href: string, public label: string, public icon: string) {}
}
