import { Component, OnInit } from '@angular/core';
import { MENUITEMS, Menu } from './navbar-items';
import { AuthService } from '../../../../_services/auth/auth.service';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userName: string;
  public menuItems: Menu[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
   this.authService.getUserName().subscribe(userName =>
    this.userName = userName);
   this.menuItems = MENUITEMS.filter(menuItem => menuItem);
  }

}
