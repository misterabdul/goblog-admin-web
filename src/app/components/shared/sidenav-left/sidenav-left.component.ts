import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-component-shared-sidenav-left',
  templateUrl: './sidenav-left.component.html',
  styleUrls: ['./sidenav-left.component.scss'],
})
export class SharedSidenavLeftComponent implements AfterViewInit {
  private _navItems: Array<SideNavItem>;

  constructor() {
    this._navItems = new Array<SideNavItem>();
  }

  ngAfterViewInit(): void {
    this._navItems = [
      new SideNavItem('/dashboard', 'Dashboard', 'home'),
      new SideNavItem('/category', 'Categories', 'category'),
      new SideNavItem('/post', 'Posts', 'article'),
      new SideNavItem('/comment', 'Comments', 'comment'),
      new SideNavItem('/user', 'Users', 'people_alt'),
    ];
  }

  get navItems(): Array<SideNavItem> {
    return this._navItems;
  }
}

class SideNavItem {
  constructor(public href: string, public label: string, public icon: string) {}
}
