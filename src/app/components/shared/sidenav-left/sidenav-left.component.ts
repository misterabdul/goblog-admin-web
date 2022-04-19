import { AfterViewInit, Component, Input } from '@angular/core';

import { UserRole } from 'src/app/types/user.type';
import { UserRoleLevel } from 'src/app/utils/user-roles.util';

@Component({
  selector: 'app-component-shared-sidenav-left',
  templateUrl: './sidenav-left.component.html',
  styleUrls: ['./sidenav-left.component.scss'],
})
export class SharedSidenavLeftComponent implements AfterViewInit {
  private _userRoles: Array<UserRole>;
  private _navItems: Array<SideNavItem>;

  constructor() {
    this._userRoles = new Array<UserRole>();
    this._navItems = new Array<SideNavItem>();
  }

  protected setNavItems() {
    if (
      this._userRoles.some(
        (userRole) =>
          userRole.level! === UserRoleLevel.SUPERADMIN ||
          userRole.level! === UserRoleLevel.ADMIN ||
          userRole.level! === UserRoleLevel.WRITER ||
          userRole.level! === UserRoleLevel.EDITOR
      )
    )
      this._navItems.push(
        new SideNavItem('/post', 'Posts', 'article'),
        new SideNavItem('/comment', 'Comments', 'comment')
      );

    if (
      this._userRoles.some(
        (userRole) =>
          userRole.level! === UserRoleLevel.SUPERADMIN ||
          userRole.level! === UserRoleLevel.ADMIN ||
          userRole.level! === UserRoleLevel.EDITOR
      )
    )
      this._navItems.push(
        new SideNavItem('/category', 'Categories', 'category'),
        new SideNavItem('/page', 'Pages', 'description')
      );

    if (
      this._userRoles.some(
        (userRole) =>
          userRole.level! === UserRoleLevel.SUPERADMIN ||
          userRole.level! === UserRoleLevel.ADMIN
      )
    )
      this._navItems.push(new SideNavItem('/user', 'Users', 'people_alt'));

    if (
      this._userRoles.some(
        (userRole) => userRole.level! === UserRoleLevel.SUPERADMIN
      )
    )
      this._navItems.push();
  }

  ngAfterViewInit(): void {
    this._navItems = [new SideNavItem('/dashboard', 'Dashboard', 'home')];
  }

  @Input()
  set userRoles(userRoles: Array<UserRole>) {
    this._userRoles = userRoles;
    this.setNavItems();
  }

  get navItems(): Array<SideNavItem> {
    return this._navItems;
  }
}

class SideNavItem {
  constructor(public href: string, public label: string, public icon: string) {}
}
