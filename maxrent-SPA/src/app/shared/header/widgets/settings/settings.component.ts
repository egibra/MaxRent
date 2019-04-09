import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CartItem } from '../../../../shared/classes/cart-item';
import { CartService } from '../../../../shared/services/cart.service';
import { ProductsService } from '../../../../shared/services/products.service';
import { Observable, of } from 'rxjs';
import { OrderItemForCreation } from 'src/app/_models/order-models/order-item-for-creation';
declare var $: any;

@Component({
  selector: 'app-header-widgets',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @Input() shoppingCartItems:   OrderItemForCreation[] = [];

  show = false;
  showItems = true;
  constructor(private translate: TranslateService, private cartService: CartService,
   public productsService: ProductsService) { }

  ngOnInit() { }

  public updateCurrency(curr) {
    this.productsService.currency = curr;
  }
  onShowItems(): void {
    console.log('showing items');
    this.showItems = true;
  }
  onHideItems(): void {
    console.log('hidingItems');
    this.showItems = false;
  }
  public changeLanguage(lang) {
    this.translate.use(lang);
  }

  public openSearch() {
    this.show = true;
  }

  public closeSearch() {
    this.show = false;
  }

  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

  public removeItem(item: OrderItemForCreation) {
    this.cartService.removeFromCart(item);
  }

}
