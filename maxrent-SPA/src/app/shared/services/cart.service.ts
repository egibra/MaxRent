import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { OrderItemForCreation } from 'src/app/_models/order-models/order-item-for-creation';

// Get product from Localstorage
let orderItems: OrderItemForCreation [] = JSON.parse(localStorage.getItem('cartItem')) || [];

@Injectable({
  providedIn: 'root'
})

export class CartService {

  // Array
  private _cartItemsSubject:  BehaviorSubject<OrderItemForCreation[]> = new BehaviorSubject([]);
  public observer:  Subscriber<{}>;

  constructor(private toastrService: ToastrService) {
      this._cartItemsSubject.subscribe(newOrderItems => orderItems = newOrderItems);
  }

  // Get Products
  public getItems(): Observable<OrderItemForCreation[]> {
    const itemsStream = new Observable(observer => {
      observer.next(orderItems);
      observer.complete();
    });
    return <Observable<OrderItemForCreation[]>>itemsStream;
  }


  // Add to cart
  public addToCart(newOrderItem: OrderItemForCreation): void {
    const canAddToCart = true;
   // canAddToCart = orderItems.filter(orderItem => orderItem.product.id === orderItem.product.id)[0] ? true : false;

    if (canAddToCart) {
    orderItems.push(newOrderItem);
    this.toastrService.success('Produktas pridėtas.');
    localStorage.setItem('cartItem', JSON.stringify(orderItems));
    } else {
     const prod = orderItems.filter(orderItem => {
       return orderItem.product.id === orderItem.product.id;
     })[0];

     prod.assetsCount += newOrderItem.assetsCount;
     prod.totalPrice += newOrderItem.totalPrice;
    }
  }

  // Removed in cart
  removeFromCart(item: OrderItemForCreation): boolean {
    if (item === undefined) { return false; }
      const index = orderItems.indexOf(item);
      orderItems.splice(index, 1);
      this._cartItemsSubject.next(orderItems);
      localStorage.setItem('cartItem', JSON.stringify(orderItems));
  }
  clearCart(): void {
    orderItems.splice(0, orderItems.length);
    this._cartItemsSubject.next(orderItems);
    localStorage.setItem('cartItem', JSON.stringify(orderItems));
  }

  // Total amount
  getTotalAmount(): Observable<number> {
    return this._cartItemsSubject.pipe(map((orderItem: OrderItemForCreation[]) => {
      return orderItems.reduce((prev, curr: OrderItemForCreation) => {
        return prev + curr.totalPrice;
      }, 0);
    }));
  }


}
