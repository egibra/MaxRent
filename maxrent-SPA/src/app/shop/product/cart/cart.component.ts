import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../shared/classes/cart-item';
import { CartService } from '../../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { ProductsService } from 'src/app/_services/products/products.service';
import { OrderItemForCreation } from 'src/app/_models/order-item-for-creation';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cartItems:   Observable<OrderItemForCreation[]> = of([]);
  public shoppingCartItems:   OrderItemForCreation[] = [];

  constructor(private productsService: ProductsService,
    private cartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
  }

  // Get Total
  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

  // Remove cart items
  public removeItem(item: OrderItemForCreation) {
    this.cartService.removeFromCart(item);
  }

}
