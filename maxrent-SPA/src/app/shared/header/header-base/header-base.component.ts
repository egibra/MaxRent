import { Component, Inject, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { LandingFixService } from '../../services/landing-fix.service';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from '../../services/windows.service';
import { CartItem } from '../../classes/cart-item';
import { CartService } from '../../services/cart.service';
import { Observable, of } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-header-base',
  templateUrl: './header-base.component.html',
  styleUrls: ['./header-base.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderBaseComponent implements OnInit {

  public shoppingCartItems:   CartItem[] = [];

  constructor(@Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window, private fix: LandingFixService, private cartService: CartService) {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
  }

  ngOnInit() {
    $.getScript('assets/js/menu.js');
  }

  openNav() {
    this.fix.addNavFix();
  }

  closeNav() {
     this.fix.removeNavFix();
  }

}
